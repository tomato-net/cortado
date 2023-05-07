package main

import (
	"bytes"
	"flag"
	"fmt"
	"io"
	"log"
	"os"
	"strings"
)

var letters = []rune{'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'}

func main() {
	var wordFile, filterLetter string
	var starting, total, length bool
	var filterLength int
	flag.StringVar(&wordFile, "wordfile", "", "")
	flag.BoolVar(&starting, "starting", false, "")
	flag.BoolVar(&total, "total", false, "")
	flag.BoolVar(&length, "length", false, "")
	flag.IntVar(&filterLength, "filter-length", 0, "")
	flag.StringVar(&filterLetter, "filter-letter", "", "")
	flag.Parse()

	file, err := os.Open(wordFile)
	CheckIfError(err)

	defer file.Close()

	data, err := io.ReadAll(file)
	CheckIfError(err)

	letterCount := make(map[rune]int)
	startingLetterCount := make(map[rune]int)
	for _, l := range letters {
		letterCount[l] = 0
		startingLetterCount[l] = 0
	}

	var words []string
	for _, v := range bytes.Split(data, []byte("\n")) {
		word := strings.Split(string(v), ",")[0]
		words = append(words, word)
	}

	var filteredLength, filteredLetter []string
	wordLength := make([]int, 23)
	for _, word := range words {
		if len(word) == 0 {
			continue
		}

		var letterMatch bool
		for _, l := range word {
			if string(l) == filterLetter {
				letterMatch = true
			}

			letterCount[l]++
		}

		if letterMatch {
			filteredLetter = append(filteredLetter, word)
		}

		startingLetterCount[rune(word[0])]++
		wordLength[len(word)]++

		if len(word) == filterLength {
			filteredLength = append(filteredLength, word)
		}
	}

	if starting {
		printStartingLetter(startingLetterCount)
	}

	if total {
		printTotalLetters(letterCount)
	}

	if length {
		printWordLength(wordLength)
	}

	if filterLength > 0 && filterLetter != "" {
		printFilterLengthAndLetter(filteredLength, filteredLetter)
	} else if filterLength > 0 {
		printFilterLength(filteredLength)
	} else if filterLetter != "" {
		printFilterLetter(filteredLetter)
	}
}

func CheckIfError(err error) {
	if err != nil {
		log.Fatal(err.Error())
	}
}

func printTotalLetters(d map[rune]int) {
	fmt.Println("========= TOTAL LETTERS ==========")
	for k, v := range d {
		fmt.Println(string(k), v)
	}
}

func printStartingLetter(d map[rune]int) {
	fmt.Println("========= STARTING LETTER ==========")
	for k, v := range d {
		fmt.Println(string(k), v)
	}
}

func printWordLength(d []int) {
	fmt.Println("========= WORD LENGTH ==========")
	for k, v := range d {
		fmt.Println(k, v)
	}
}

func printFilterLength(d []string) {
	fmt.Println("========= FILTER LENGTH ==========")
	for _, v := range d {
		fmt.Println(v)
	}
}

func printFilterLetter(d []string) {
	fmt.Println("========= FILTER LETTER ==========")
	for _, v := range d {
		fmt.Println(v)
	}
}

func printFilterLengthAndLetter(a, b []string) {
	fmt.Println("========= FILTER LENGTH & LETTER ==========")
	for _, v := range a {
		for _, x := range b {
			if v == x {
				fmt.Println(v)
			}
		}
	}
}
