#!/bin/bash
# SkillForge VPS Setup Script
# Run once as root on a fresh Ubuntu 22.04 Hostinger VPS:
#   bash setup-vps.sh YOUR_DOMAIN
# Replace YOUR_DOMAIN with your actual domain (e.g. skillforge.yourdomain.com)

set -euo pipefail

DOMAIN="${1:-}"
REPO="https://github.com/sathyase2024/test_AIUpskilling.git"
APP_DIR="/opt/skillforge"

if [ -z "$DOMAIN" ]; then
  echo "Usage: bash setup-vps.sh YOUR_DOMAIN"
  exit 1
fi

echo "======================================"
echo " SkillForge VPS Setup"
echo " Domain: $DOMAIN"
echo "======================================"

# ── 1. System packages ─────────────────────────────────────────────────────────
echo "[1/6] Installing packages..."
apt update -qq && apt upgrade -y -qq
apt install -y -qq docker.io docker-compose-plugin nginx certbot python3-certbot-nginx ufw git curl

systemctl enable --now docker nginx

# ── 2. Firewall ────────────────────────────────────────────────────────────────
echo "[2/6] Configuring firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# ── 3. Clone repo ─────────────────────────────────────────────────────────────
echo "[3/6] Cloning repository..."
mkdir -p "$APP_DIR"
if [ -d "$APP_DIR/.git" ]; then
  cd "$APP_DIR" && git pull origin main
else
  git clone "$REPO" "$APP_DIR"
  cd "$APP_DIR"
fi

# ── 4. Environment file ────────────────────────────────────────────────────────
echo "[4/6] Setting up environment..."
if [ ! -f "$APP_DIR/.env" ]; then
  cp "$APP_DIR/.env.production.example" "$APP_DIR/.env"
  sed -i "s/yourdomain.com/$DOMAIN/" "$APP_DIR/.env"
  echo ""
  echo "⚠️  Edit $APP_DIR/.env with real values before continuing:"
  echo "   DB_PASSWORD  — strong random password"
  echo "   JWT_SECRET   — long random string"
  echo "   ANTHROPIC_API_KEY — optional, for AI lesson generation"
  echo ""
  echo "   Generate secrets with: openssl rand -base64 48"
  echo ""
  read -p "Press Enter once you've edited .env..."
fi

# ── 5. Nginx ───────────────────────────────────────────────────────────────────
echo "[5/6] Configuring Nginx..."
sed "s/YOUR_DOMAIN/$DOMAIN/g" "$APP_DIR/nginx/skillforge.conf" > /etc/nginx/sites-available/skillforge
ln -sf /etc/nginx/sites-available/skillforge /etc/nginx/sites-enabled/skillforge
rm -f /etc/nginx/sites-enabled/default

# Temp HTTP-only config so certbot can validate (SSL lines would fail before cert exists)
cat > /etc/nginx/sites-available/skillforge <<EOF
server {
    listen 80;
    server_name $DOMAIN;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
EOF

nginx -t && systemctl reload nginx

# ── 6. SSL certificate ─────────────────────────────────────────────────────────
echo "[6/6] Obtaining SSL certificate..."
certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "admin@$DOMAIN"

# Now write the full Nginx config with SSL
sed "s/YOUR_DOMAIN/$DOMAIN/g" "$APP_DIR/nginx/skillforge.conf" > /etc/nginx/sites-available/skillforge
nginx -t && systemctl reload nginx

# ── Start the app ──────────────────────────────────────────────────────────────
echo "Starting SkillForge..."
cd "$APP_DIR"
docker compose -f docker-compose.prod.yml up -d --build

echo ""
echo "======================================"
echo " Setup complete!"
echo " App: https://$DOMAIN"
echo " Logs: docker compose -f /opt/skillforge/docker-compose.prod.yml logs -f"
echo "======================================"
echo ""
echo "Next: Add these GitHub Secrets for auto-deploy on every push:"
echo "  VPS_HOST = $(curl -s ifconfig.me)"
echo "  VPS_USER = root"
echo "  VPS_SSH_KEY = (paste your private SSH key)"
