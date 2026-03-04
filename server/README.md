# Magic Stream Movies - Go后端服务

这是一个使用Go语言开发的电影流媒体平台后端服务，提供完整的电影管理、用户认证、评论分析和推荐系统功能。

## 🚀 功能特性

- **用户管理**: 用户注册、登录、JWT认证
- **电影管理**: 电影CRUD操作、分类管理
- **智能评论分析**: 使用OpenAI API进行情感分析
- **个性化推荐**: 基于用户喜好的电影推荐
- **权限控制**: 管理员和普通用户权限分离
- **CORS支持**: 跨域请求支持

## 📁 项目结构

```
server/
├── controllers/          # 控制器层
│   ├── movie_controller.go
│   └── user_controller.go
├── database/            # 数据库连接
│   └── database_connection.go
├── middleware/          # 中间件
│   └── auth_middleware.go
├── models/             # 数据模型
│   ├── movie_model.go
│   └── user_model.go
├── routes/             # 路由定义
│   ├── protected_routers.go
│   └── unprotected_routes.go
├── utils/              # 工具函数
│   └── token_utils.go
├── .env                # 环境变量配置
├── go.mod             # Go模块配置
├── go.sum             # 依赖校验
└── main.go            # 应用入口
```

## 🛠️ 技术栈

- **框架**: Gin Web Framework
- **数据库**: MongoDB
- **认证**: JWT (JSON Web Tokens)
- **AI集成**: OpenAI API (情感分析)
- **CORS**: Gin CORS中间件
- **验证**: Go Playground Validator

## 📋 环境要求

- Go 1.19+
- MongoDB 4.4+
- OpenAI API密钥

## ⚙️ 安装与运行

### 1. 克隆项目
```bash
git clone <repository-url>
cd streamMovie_go_react_fullstack/server
```

### 2. 配置环境变量
创建 `.env` 文件并配置以下变量：

```env
# 数据库配置
DATABASE_NAME=magic-stream-movies
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/

# JWT密钥
SECRET_KEY=your-jwt-secret-key
SECRET_REFRESH_KEY=your-refresh-token-secret-key

# OpenAI配置
OPENAI_API_KEY=your-openai-api-key
BASE_PROMPT_TEMPLATE=分析此电影评论的情感并分类到以下类别之一: {rankings}。仅返回单个类别名称，不包含其他文本。评论:

# 应用配置
RECOMMENDED_MOVIE_LIMIT=5
ALLOWED_ORIGINS=*
```

### 3. 安装依赖
```bash
go mod tidy
```

### 4. 运行应用
```bash
# 开发模式 (使用Air热重载)
air

# 或直接运行
 go run main.go
```

应用将在 `http://localhost:8080` 启动

## 📚 API文档

### 认证相关端点

#### 用户注册
```http
POST /register
Content-Type: application/json

{
  "username": "user123",
  "email": "user@example.com",
  "password": "password123",
  "role": "USER"
}
```

#### 用户登录
```http
POST /login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### 电影相关端点

#### 获取所有电影
```http
GET /movies
Authorization: Bearer <token>
```

#### 获取单个电影
```http
GET /movie/:imdb_id
Authorization: Bearer <token>
```

#### 添加电影 (管理员)
```http
POST /movie
Authorization: Bearer <token>
Content-Type: application/json

{
  "imdb_id": "tt1234567",
  "title": "电影标题",
  "description": "电影描述",
  "genre": {
    "genre_id": 1,
    "genre_name": "动作"
  },
  "release_year": 2023,
  "rating": 8.5
}
```

#### 更新电影评论 (管理员)
```http
PATCH /updatereview/:imdb_id
Authorization: Bearer <token>
Content-Type: application/json

{
  "admin_review": "这是一部非常精彩的电影，演员表演出色，剧情紧凑。"
}
```

#### 获取推荐电影
```http
GET /recommendedmovies
Authorization: Bearer <token>
```

### 用户相关端点

#### 获取用户信息
```http
GET /user
Authorization: Bearer <token>
```

## 🔧 开发指南

### 添加新的API端点

1. 在 `routes/` 目录下添加路由定义
2. 在 `controllers/` 目录下实现控制器逻辑
3. 在 `models/` 目录下定义数据模型
4. 更新主路由文件

### 数据库操作示例

```go
// 查询电影
var movieCollection *mongo.Collection = database.OpenCollection("movies", client)
err := movieCollection.FindOne(ctx, bson.M{"imdb_id": imdbID}).Decode(&movie)

// 插入数据
result, err := movieCollection.InsertOne(ctx, movie)

// 更新数据
filter := bson.M{"imdb_id": movieId}
update := bson.M{"$set": bson.M{"admin_review": review}}
result, err := movieCollection.UpdateOne(ctx, filter, update)
```

### 中间件使用

```go
// 认证中间件
router.Use(middleware.Authentication())

// CORS配置
router.Use(cors.New(config))
```

## 🧪 测试

运行测试：
```bash
go test ./...
```

## 🐛 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查MongoDB连接字符串
   - 确认网络连接

2. **JWT认证失败**
   - 检查SECRET_KEY配置
   - 验证token格式

3. **OpenAI API超时**
   - 系统已内置降级机制，会自动使用本地情感分析
   - 检查API密钥有效性

### 日志查看

应用日志会输出到控制台，包含：
- 请求处理信息
- 错误详情
- 性能指标

## 🤝 贡献指南

1. Fork项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 📄 许可证

本项目采用MIT许可证 - 查看LICENSE文件了解详情。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 项目Issues
- 邮箱: [your-email@example.com]

---

**开发团队** - Magic Stream Movies Team