# Student Cheat Sheet - EMS React App with Podman

## Quick Commands Reference

### Local Development
```bash
# Setup
npm install
cp .env.example .env
# Edit .env with your Okta credentials

# Run
npm run dev

# Access: http://localhost:5173
```

---

### Podman Container Deployment

#### Build
```bash
podman build -t ems-frontend .
```

#### Run (Update with YOUR Okta credentials!)
```bash
podman run -d \
  --name ems-frontend \
  -p 8080:80 \
  -e VITE_OKTA_DOMAIN=https://integrator-1649836.okta.com \
  -e VITE_OKTA_CLIENT_ID=0oaxhzqctrCKvudI8697 \
  -e VITE_OKTA_DISABLE_HTTPS_CHECK=false \
  -e VITE_API_BASE_URL=http://localhost:3000/api \
  ems-frontend
```

Access: http://localhost:8080

#### View Logs
```bash
podman logs ems-frontend
podman logs -f ems-frontend  # Follow mode
```

#### Stop & Remove
```bash
podman stop ems-frontend
podman rm ems-frontend
```

#### Rebuild (after code changes)
```bash
podman stop ems-frontend
podman rm ems-frontend
podman build -t ems-frontend .
# Then run again
```

---

### With Backend Container

```bash
# Create network
podman network create ems-network

# Run backend
podman run -d --name ems-backend --network ems-network -p 3000:3000 ems-backend

# Run frontend
podman run -d \
  --name ems-frontend \
  --network ems-network \
  -p 8080:80 \
  -e VITE_OKTA_DOMAIN=https://your-domain.okta.com \
  -e VITE_OKTA_CLIENT_ID=your-client-id \
  -e VITE_OKTA_DISABLE_HTTPS_CHECK=false \
  -e VITE_API_BASE_URL=http://localhost:3000/api \
  ems-frontend

# Stop both
podman stop ems-frontend ems-backend
podman rm ems-frontend ems-backend
```

---

## Troubleshooting

### "Issuer must be a valid URL"
➜ You forgot to provide Okta environment variables. Check your `-e` flags.

### "Cannot connect to backend"
```bash
# Check backend is running
podman ps
curl http://localhost:3000/api/employees
```

### Container won't start
```bash
# Check logs for errors
podman logs ems-frontend

# View all containers (including stopped)
podman ps -a
```

### Need to check config inside container
```bash
podman exec ems-frontend cat /usr/share/nginx/html/config.js
```

---

## Important Notes

✅ **Always provide ALL environment variables** when running container  
✅ Build once, run with different configs by changing `-e` values  
✅ Port 8080 for container, 5173 for local dev  
✅ Nginx serves the production build inside container  

❌ Don't forget the `-e` flags  
❌ Don't use `npm run dev` inside container  
❌ Don't edit code without rebuilding image
