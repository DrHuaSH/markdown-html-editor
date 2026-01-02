# NPM 访问令牌错误解决方案

## 错误信息
```
npm notice Access token expired or revoked. Please try logging in again.
```

## 解决方案

### 方案一：重新登录npm（推荐）
```bash
# 1. 退出当前npm登录
npm logout

# 2. 清除npm缓存
npm cache clean --force

# 3. 重新登录npm
npm login
```

### 方案二：重置npm配置
```bash
# 1. 删除npm配置文件
# Windows: 删除 C:\Users\你的用户名\.npmrc 文件
# 或者使用命令：
npm config delete registry
npm config delete //registry.npmjs.org/:_authToken

# 2. 重置为默认registry
npm config set registry https://registry.npmjs.org/

# 3. 清除缓存
npm cache clean --force
```

### 方案三：使用不同的包管理器
```bash
# 使用yarn代替npm
npm install -g yarn
yarn install
yarn start

# 或使用pnpm
npm install -g pnpm
pnpm install
pnpm start
```

### 方案四：检查网络和代理
```bash
# 如果使用代理，可能需要配置
npm config set proxy http://your-proxy:port
npm config set https-proxy http://your-proxy:port

# 或者取消代理设置
npm config delete proxy
npm config delete https-proxy
```

## 验证修复
```bash
# 检查npm配置
npm config list

# 测试npm连接
npm ping

# 查看当前用户
npm whoami
```