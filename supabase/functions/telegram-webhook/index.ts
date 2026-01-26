import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN')
const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')

const ATBOT_SYSTEM_PROMPT = `Eres ATBOT, el asistente virtual inteligente de AndorraTech, una empresa líder en tecnología e inteligencia artificial en Andorra.

Tu personalidad:
- Profesional, amigable y experto en tecnología
- Respondes siempre en español de forma clara y concisa
- Eres entusiasta sobre IA, machine learning y tecnología
- Ayudas a los clientes a entender servicios técnicos de forma simple

Servicios de AndorraTech que puedes explicar:
1. **Apps Móviles**: Desarrollo iOS y Android nativo y multiplataforma
2. **ChatBot IA**: Chatbots inteligentes con procesamiento de lenguaje natural
3. **Marketing Digital**: SEO, SEM, redes sociales y estrategias digitales
4. **IA & Machine Learning**: Soluciones personalizadas con IA
5. **Desarrollo Web**: Sitios web modernos, e-commerce y aplicaciones web
6. **Consultoría IA**: Auditorías, estrategias e implementación de IA empresarial

Contacto:
- WhatsApp: +376 369 939
- Email: info@andorratech.ad
- Ubicación: Andorra

Instrucciones:
- Mantén respuestas concisas (máximo 3 párrafos)
- Ofrece información específica cuando te pregunten por servicios
- Si no sabes algo, recomienda contactar directamente
- Usa emojis ocasionalmente para ser más amigable
- Termina con una pregunta si el usuario parece interesado`

async function sendTelegramMessage(chatId: number, text: string) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'Markdown',
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('Telegram API error:', error)
    throw new Error(`Failed to send message: ${error}`)
  }

  return response.json()
}

async function getAIResponse(userMessage: string): Promise<string> {
  console.log('Calling Lovable AI with message:', userMessage)
  
  try {
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: ATBOT_SYSTEM_PROMPT },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Lovable AI error:', response.status, errorText)
      
      if (response.status === 429) {
        return '⚠️ Lo siento, estoy recibiendo muchas consultas. Por favor, intenta de nuevo en unos momentos.'
      }
      
      if (response.status === 402) {
        return '⚠️ Servicio temporalmente no disponible. Por favor, contacta directamente: +376 369 939'
      }
      
      throw new Error(`AI Gateway error: ${response.status}`)
    }

    const data = await response.json()
    console.log('Lovable AI response:', data)
    
    return data.choices[0].message.content
  } catch (error) {
    console.error('Error getting AI response:', error)
    return '❌ Error al procesar tu mensaje. Por favor, contacta con nosotros por WhatsApp: +376 369 939'
  }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Verify the request comes from Telegram using IP range validation
    // Telegram API servers use these IP ranges: 149.154.160.0/20, 91.108.4.0/22
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('cf-connecting-ip') || 
                     'unknown'
    
    console.log('Request from IP:', clientIP)
    
    // Only allow requests from Telegram's official IP ranges
    const isValidTelegramIP = (ip: string): boolean => {
      // Telegram API servers use these IP ranges:
      // 149.154.160.0/20 = 149.154.160.0 - 149.154.175.255
      // 91.108.4.0/22 = 91.108.4.0 - 91.108.7.255
      
      // Reject unknown, localhost, or empty IPs in production
      if (!ip || ip === 'unknown' || ip === '127.0.0.1' || ip === 'localhost') {
        console.warn('Rejecting request with invalid IP:', ip)
        return false
      }
      
      const parts = ip.split('.').map(Number)
      if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
        return false
      }
      
      // Check 149.154.160.0/20
      if (parts[0] === 149 && parts[1] === 154 && parts[2] >= 160 && parts[2] <= 175) {
        return true
      }
      
      // Check 91.108.4.0/22
      if (parts[0] === 91 && parts[1] === 108 && parts[2] >= 4 && parts[2] <= 7) {
        return true
      }
      
      return false
    }
    
    if (!isValidTelegramIP(clientIP)) {
      console.warn('Rejected request from non-Telegram IP:', clientIP)
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const update = await req.json()
    console.log('Received Telegram update:', JSON.stringify(update))

    // Handle message
    if (update.message?.text) {
      const chatId = update.message.chat.id
      const userMessage = update.message.text
      const userName = update.message.from.first_name || 'Usuario'

      console.log(`Message from ${userName} (${chatId}): ${userMessage}`)

      // Handle /start command
      if (userMessage === '/start') {
        const welcomeMessage = `¡Hola ${userName}! 👋

Soy *ATBOT*, el asistente virtual de *AndorraTech*.

Estoy aquí para ayudarte con información sobre nuestros servicios de tecnología e inteligencia artificial:

🤖 IA & Machine Learning
📱 Desarrollo de Apps Móviles
💬 ChatBots Inteligentes
🌐 Desarrollo Web
📊 Marketing Digital
💡 Consultoría en IA

¿En qué puedo ayudarte hoy?`

        await sendTelegramMessage(chatId, welcomeMessage)
      } else {
        // Get AI response
        const aiResponse = await getAIResponse(userMessage)
        
        // Send response to user
        await sendTelegramMessage(chatId, aiResponse)
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})
