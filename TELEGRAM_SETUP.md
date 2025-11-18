# 🤖 Configuración del Bot de Telegram con ATBOT

## ✅ Pasos completados automáticamente:
- [x] Lovable AI habilitado
- [x] Edge function creado
- [x] Token del bot configurado
- [x] Sistema de IA implementado

## 📋 Configuración del Webhook (Solo 2 pasos)

### 1. Obtener URL del Webhook

Tu webhook está disponible en:
```
https://rprbwlywuzcksapgyayl.supabase.co/functions/v1/telegram-webhook
```

### 2. Configurar el Webhook de Telegram

Ejecuta este comando en tu terminal (reemplaza `TU_TOKEN_BOT` con tu token real):

```bash
curl -X POST "https://api.telegram.org/botTU_TOKEN_BOT/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://rprbwlywuzcksapgyayl.supabase.co/functions/v1/telegram-webhook"}'
```

**Respuesta esperada:**
```json
{"ok":true,"result":true,"description":"Webhook was set"}
```

### 3. ¡Probar el Bot! 🎉

1. Abre Telegram
2. Busca tu bot (el nombre que usaste con @BotFather)
3. Envía `/start`
4. ¡ATBOT responderá automáticamente!

---

## 🔍 Verificar Estado del Webhook

Para verificar que el webhook está configurado:

```bash
curl "https://api.telegram.org/botTU_TOKEN_BOT/getWebhookInfo"
```

---

## 🧪 Probar el Bot Manualmente

Si prefieres no usar curl, puedes hacerlo desde tu navegador:

1. Abre esta URL (reemplaza TU_TOKEN_BOT):
```
https://api.telegram.org/botTU_TOKEN_BOT/setWebhook?url=https://rprbwlywuzcksapgyayl.supabase.co/functions/v1/telegram-webhook
```

2. Deberías ver: `{"ok":true,"result":true}`

---

## 📊 Monitorear el Bot

Ver logs en tiempo real:
- [Ver logs del bot](https://supabase.com/dashboard/project/rprbwlywuzcksapgyayl/functions/telegram-webhook/logs)

---

## 🎯 Capacidades de ATBOT

El bot responderá preguntas sobre:
- ✅ Servicios de AndorraTech
- ✅ IA y Machine Learning
- ✅ Desarrollo de Apps Móviles
- ✅ ChatBots Inteligentes
- ✅ Marketing Digital
- ✅ Desarrollo Web
- ✅ Consultoría en IA

---

## ❓ Comandos Disponibles

- `/start` - Mensaje de bienvenida
- Cualquier pregunta - ATBOT responderá con IA

---

## 🚨 Solución de Problemas

### El bot no responde:
1. Verifica que el webhook esté configurado:
```bash
curl "https://api.telegram.org/botTU_TOKEN_BOT/getWebhookInfo"
```

2. Revisa los logs: [Logs de Telegram Webhook](https://supabase.com/dashboard/project/rprbwlywuzcksapgyayl/functions/telegram-webhook/logs)

3. Verifica que el token esté correcto en Supabase Secrets

### Rate limits:
Si ves mensajes de "muchas consultas", espera 1 minuto y vuelve a intentar.

---

## 🎨 Personalización

El prompt de ATBOT está en:
`supabase/functions/telegram-webhook/index.ts`

Busca la constante `ATBOT_SYSTEM_PROMPT` para modificar la personalidad del bot.

---

## 💰 Costos

- Telegram Bot API: **GRATIS**
- Lovable AI: Uso gratuito mensual incluido, luego pay-per-use
- Supabase Edge Functions: Incluido en plan gratuito

---

¡Tu bot está listo! 🎉
