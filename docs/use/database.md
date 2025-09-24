数据库功能使用说明

数据库功能需要您用您的 Github 账号注册 Supabase 账号，并创建一个数据库。

创建好数据库后，**请严格按照下面步骤操作**。

---

先在左侧边栏找到 `SQL Editer` ，打开它。

![](https://cdn.luogu.com.cn/upload/image_hosting/e4hn8lem.png)

然后将下面代码复制到编辑器内并全选。然后运行。

```sql
CREATE TABLE user_codes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    problem_id TEXT NOT NULL,
    code TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, problem_id)
);

CREATE INDEX idx_user_codes_user_id ON user_codes(user_id);
CREATE INDEX idx_user_codes_problem_id ON user_codes(problem_id);
CREATE INDEX idx_user_codes_user_problem ON user_codes(user_id, problem_id);

ALTER TABLE user_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "用户只能访问自己的代码" ON user_codes
    FOR ALL USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_codes_updated_at 
    BEFORE UPDATE ON user_codes 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE POLICY "允许匿名用户创建代码" ON user_codes
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "允许匿名用户更新自己的代码" ON user_codes
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "允许匿名用户删除自己的代码" ON user_codes
    FOR DELETE USING (auth.uid() = user_id);
```



![](https://cdn.luogu.com.cn/upload/image_hosting/xh21tj2h.png)

再打开 `Authentication`。

![](https://cdn.luogu.com.cn/upload/image_hosting/k725a80e.png)

再打开 `Sign In / Providers`。

![](https://cdn.luogu.com.cn/upload/image_hosting/wzitbnsu.png)

开启 `Allow anonymous sign-ins`。

![](https://cdn.luogu.com.cn/upload/image_hosting/g1o5cazi.png)

侧边栏找到 `Project Settings`。

![](https://cdn.luogu.com.cn/upload/image_hosting/juxphq8b.png)

打开 `Data API` ，复制 `Project URL`。

![](https://cdn.luogu.com.cn/upload/image_hosting/zxxqjjw5.png)

打开插件的 `Supabase 配置`，将刚复制的链接放到 `Project URL` 一栏。

![](https://cdn.luogu.com.cn/upload/image_hosting/859a23nm.png)

同样在 `API Keys` 一栏复制 `public anon key`。

![](https://cdn.luogu.com.cn/upload/image_hosting/6wzr1nc0.png)

打开插件的 `Supabase 配置`，将刚刚复制的放到另一栏。

![](https://cdn.luogu.com.cn/upload/image_hosting/haysfx8a.png)

前几次保存/测试可能会出错，后面就不会报错了。

---

注意数据库有速率限制，且只有 90 天试用。