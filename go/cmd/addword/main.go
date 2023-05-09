package main

import (
	"bufio"
	"flag"
	"fmt"
	"os"
	"strings"
)

func main() {
	var wordFile string
	flag.StringVar(&wordFile, "f", "", "")
	flag.Parse()

	f, err := os.OpenFile(wordFile, os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0644)
	if err != nil {
		panic(err.Error())
	}

	defer f.Close()

	reader := bufio.NewReader(os.Stdin)
	for {
		fmt.Printf("word: ")
		w, _ := reader.ReadString('\n')
		w = strings.ToUpper(w)
		w = strings.TrimSuffix(w, "\n")
		if _, err := f.WriteString(fmt.Sprintf("%s,100\n", w)); err != nil {
			fmt.Printf("failed adding %s: %s\n", w, err.Error())
		}

		p := fmt.Sprintf("%sS", w)
		fmt.Printf("add plural '%s'? [Y/n] ", p)

		if a, _ := reader.ReadString('\n'); !strings.Contains(a, "n") {
			if _, err := f.WriteString(fmt.Sprintf("%s,100\n", p)); err != nil {
				fmt.Printf("failed adding %s: %s\n", p, err.Error())
			}
		}
	}
}
