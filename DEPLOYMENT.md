# Deployment Guide - Book Notes App

## 🚀 Deploy to Various Platforms

### Option 1: Railway.app (Recommended - Free Tier)

1. **Create a Railway account** at https://railway.app
2. **Connect your GitHub repository**
3. **Add environment variables:**
   ```
   NODE_ENV=production
   PORT=3000
   SESSION_SECRET=your-secure-32-character-secret-key
   ```
4. **Railway will automatically provide PostgreSQL database**
5. **Deploy automatically from GitHub**

### Option 2: Heroku

1. **Install Heroku CLI**
2. **Create a new Heroku app:**
   ```bash
   heroku create your-book-notes-app
   ```
3. **Add PostgreSQL addon:**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```
4. **Set environment variables:**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set SESSION_SECRET=your-secure-secret-key
   ```
5. **Deploy:**
   ```bash
   git push heroku main
   ```

### Option 3: Render.com

1. **Connect GitHub repository**
2. **Create Web Service**
3. **Set build command:** `cd backend && npm install`
4. **Set start command:** `cd backend && npm start`
5. **Add environment variables**
6. **Add PostgreSQL database**

### Option 4: DigitalOcean App Platform

1. **Create App from GitHub**
2. **Configure build settings**
3. **Add managed PostgreSQL database**
4. **Set environment variables**

## 🔧 Pre-Deployment Checklist

- [ ] Update `.env` with production values
- [ ] Change `SESSION_SECRET` to a secure 32+ character string
- [ ] Set `NODE_ENV=production`
- [ ] Update database credentials
- [ ] Test locally with production environment
- [ ] Commit all changes to Git

## 🔒 Security Notes

- Never commit `.env` files to Git
- Use strong, unique session secrets
- Enable HTTPS in production
- Use environment variables for all secrets
- Regularly update dependencies

## 📊 Database Setup

Most platforms will automatically create tables, but if needed:
```sql
-- Run these SQL commands in your production database
-- (Tables should be created automatically by the app)
```

## 🌐 Custom Domain (Optional)

After deployment, you can add a custom domain:
- Purchase domain from registrar
- Add CNAME record pointing to your deployment URL
- Configure SSL/TLS certificate

## 📈 Monitoring

- Monitor application logs
- Set up error tracking (Sentry.io)
- Monitor database performance
- Set up uptime monitoring
