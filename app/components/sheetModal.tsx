import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Bot } from 'lucide-react'
import { Chat } from './chat'

export function SheetModal() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'outline'} size={'icon'}>
          <Bot className="w-6 h-6 animate-pulse" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader className="mb-4 ">
          <SheetTitle>Language Assitant</SheetTitle>
        </SheetHeader>
        <Chat />
      </SheetContent>
    </Sheet>
  )
}
