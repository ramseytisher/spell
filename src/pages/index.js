import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import { Box, Form, Button, FormField, TextInput, List } from "grommet"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
  const initialWords = ["impassable", "avid", "devour"]

  const [playing, setPlaying] = useState(false)
  const [word, setWord] = useState("")
  const [words, setWords] = useState(initialWords)

  const [entered, setEntered] = useState("")
  const [test, setTest] = useState(buildTest)
  const [item, setItem] = useState(getTestItem)
  const [done, setDone] = useState(false)

  function say(message) {
    var msg = new SpeechSynthesisUtterance()
    msg.text = message
    window.speechSynthesis.speak(msg)
  }

  function buildTest() {
    let newTest = []
    words.forEach((word, index) => {
      newTest.push({
        key: index,
        answer: word,
      })
    })
    return newTest
  }

  useEffect(() => {
    setItem(getTestItem)
  }, [test])

  useEffect(() => {
    setTest(buildTest)
  }, [playing])

  function getTestItem() {
    let testItems = test.filter(item => {
      return !item.entered
    })

    if (testItems.length === 0) {
      setDone(true)
    } else {
      return testItems[Math.floor(Math.random() * testItems.length)]
    }
  }

  // function saveStudentAnswer(entered) {
  //   let updateTest = [...test]
  //   updateTest[item.key] = item
  //   console.log("Updated Test", updateTest)
  //   setTest(updateTest)
  //   // setItem({...item, studentAnswer: v.studentAnswer})
  // }

  function handleUpdate(id) {
    const newTest = [...test]
    setTest(
      newTest.map(el =>
        el.key === id ? { ...el, entered: entered.studentAnswer } : el
      )
    )
  }

  return (
    <Layout>
      <SEO title="Home" />
      <Box>
        <Button
          label={playing ? "Stop" : "Start"}
          onClick={() => setPlaying(!playing)}
        />
      </Box>
      {playing ? (
        <Box>
          {done ? (
            <h1>Done</h1>
          ) : (
            <Form
              value={entered}
              onChange={nextValue => setEntered(nextValue)}
              onReset={() => setEntered("")}
              onSubmit={
                // setTest(test => [...test, entered])
                // setItem({ ...item, studentAnswer: entered.studentAnswer })
                // setTest({ ...test, item})
                // setEntered("")
                // getTestItem()
                // saveStudentAnswer()
                () => handleUpdate(item.key)
              }
            >
              <FormField name="name" htmlfor="text-input-id" label="Enter Word">
                <TextInput
                  id="text-input-id"
                  name="studentAnswer"
                  value={entered}
                />
              </FormField>
              <Box direction="row" gap="medium">
                <Button label="Play" onClick={() => say(item.answer)} />
                <Button type="reset" label="Reset" />
                <Button type="submit" primary label="Submit" />
              </Box>
            </Form>
          )}
          <pre>{JSON.stringify(test, null, 2)}</pre>
        </Box>
      ) : (
        <Box>
          <Form
            value={word}
            onChange={nextValue => setWord(nextValue.word)}
            onReset={() => setWord("")}
            onSubmit={() => {
              setWords(words => [...words, word])
              setWord("")
            }}
          >
            <FormField name="name" htmlfor="text-input-id" label="Enter Word">
              <TextInput id="text-input-id" name="word" value={word} />
            </FormField>
            <Box direction="row" gap="medium">
              <Button type="submit" primary label="Add" />
              <Button type="reset" label="Reset" />
            </Box>
          </Form>
          <List data={words} />
        </Box>
      )}
      <Link to="/page-2/">Go to page 2</Link> <br />
    </Layout>
  )
}

export default IndexPage
