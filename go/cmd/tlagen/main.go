package main

import (
	"bufio"
	"flag"
	"fmt"
	"math/rand"
	"os"
	"strings"
	"time"
)

var letters = []rune{'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'}

func main() {
	var wordFile string
	flag.StringVar(&wordFile, "f", "", "")
	flag.Parse()

	var words []string
	for _, x := range letters {
		for _, y := range letters {
			for _, z := range letters {
				word := fmt.Sprintf("%s%s%s", string(x), string(y), string(z))
				words = append(words, word)
			}
		}
	}

	rand.Seed(time.Now().Unix())
	rand.Shuffle(len(words), func(i, j int) { words[i], words[j] = words[j], words[i] })

	f, err := os.OpenFile(wordFile, os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0644)
	if err != nil {
		panic(err.Error())
	}

	defer f.Close()

	reader := bufio.NewReader(os.Stdin)
	for _, word := range words {
		fmt.Printf("%s: [y/N] ", word)
		text, _ := reader.ReadString('\n')
		if strings.Contains(text, "y") {
			if _, err := f.WriteString(fmt.Sprintf("%s,100\n", word)); err != nil {
				fmt.Printf("failed adding %s: %s\n", word, err.Error())
			} else {
				fmt.Printf("added %s\n", word)
			}
		}
	}
}
