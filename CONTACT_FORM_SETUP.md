# Contact Form Setup Guide

The contact form has been successfully implemented and is ready to send emails to `milanistie13@gmail.com`. To make it work, you need to configure the SMTP credentials.

## Setup Steps

### 1. Create Environment File
Create a `.env.local` file in the root directory with the following content:

```env
# Contact Form Email Configuration
# For Gmail: Use your Gmail address and App Password (not your regular password)
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### 2. Gmail App Password Setup
If using Gmail, follow these steps:

1. Go to your Google Account settings
2. Navigate to **Security** → **2-Step Verification** → **App passwords**
3. Generate a new app password for "Mail"
4. Use this app password (16 characters) in the `SMTP_PASSWORD` field
5. Use your Gmail address in the `SMTP_USER` field

### 3. Restart Development Server
After adding the environment variables, restart your development server:

```bash
yarn dev
```

## Testing the Form

Once configured:
1. Visit `/contact` page
2. Fill out the form with:
   - Full Name
   - Email Address  
   - Message
3. Click "Send Message"
4. You should see a success message: "Pesan berhasil dikirim! Kami akan membalas email Anda segera."

## Current Status

✅ **Form Frontend**: Working correctly  
✅ **API Endpoint**: Accepting requests  
✅ **Email Template**: Configured for milanistie13@gmail.com  
⏳ **SMTP Configuration**: Waiting for credentials

The error message "Gagal mengirim pesan. Silakan coba lagi nanti" will disappear once the SMTP credentials are properly configured.