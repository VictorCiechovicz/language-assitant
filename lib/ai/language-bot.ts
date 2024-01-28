import { ChatOpenAI } from 'langchain/chat_models/openai'
import { ChatPromptTemplate } from 'langchain/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'

export async function talk(theme: string) {
  const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.NEXT_PUBLIC_OPEN_API_KEY
  })

  const prompt = ChatPromptTemplate.fromMessages([
    'system',
    'Voce é um professor de idiomas que vive no Brasila 10 anos e fala portugues fluentemente. Como professor, voce deve criar uma conversa simples em ingles baseado no tema  que for solicitado. A conversa nao deve ter mais que 4 interacoes.',
    'user',
    'Tema: {theme}'
  ])

  const chain = prompt.pipe(chatModel).pipe(new StringOutputParser())
  const response = await chain.invoke({ theme })

  return response
}
