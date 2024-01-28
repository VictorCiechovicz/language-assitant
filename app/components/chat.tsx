'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { AudioLines, Bot, Send } from 'lucide-react'
import { talk } from '@/lib/ai/language-bot'

export function Chat() {
  const [awaitingLLMResponse, setAwaitingLLMResponse] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'agent',
      content: 'Hi, send your theme class?',
      toolbox: true
    }
  ])
  const [input, setInput] = useState('')
  const inputLength = input.trim().length
  const endOfMessagesRef = useRef<any>(null)

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <>
      <Card>
        <CardContent>
          <div className="space-y-4 mt-4 ">
            {messages.map((message, index) => (
              <div
                key={index}
                ref={index === messages.length - 1 ? endOfMessagesRef : null}
                className={cn(
                  'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                  message.role === 'user'
                    ? 'ml-auto bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                {message.content}
                {message.toolbox && (
                  <div className="flex justify-end">
                    <Button size={'icon'} variant={'ghost'} className="w-6 h-6">
                      <AudioLines />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
        {awaitingLLMResponse && (
          <div className="w-full flex justify-center my-2">
            <Bot className="w-8 h-8 animate-pulse" />
          </div>
        )}

        <CardFooter>
          <form
            onSubmit={async event => {
              event.preventDefault()
              if (inputLength === 0) return
              setAwaitingLLMResponse(true)
              setMessages(previous => {
                return [
                  ...previous,
                  {
                    role: 'user',
                    content: input,
                    toolbox: false
                  }
                ]
              })
              setInput('')
              const response = await talk(input)
              setMessages(previous => {
                return [
                  ...previous,
                  {
                    role: 'agent',
                    content: response,
                    toolbox: true
                  }
                ]
              })
              setAwaitingLLMResponse(false)
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              id="message"
              placeholder="Send your subject..."
              className="flex-1"
              autoComplete="off"
              value={input}
              onChange={event => setInput(event.target.value)}
            />
            <Button
              type="submit"
              size="icon"
              disabled={inputLength === 0 || awaitingLLMResponse}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  )
}
