

---

## 📄 文件: 00base.md

---

```md
### 先把词汇补齐
识别文字后转化为笔记，格式为：
词根（可能无）
单词1 单词1翻译
例句1
补充笔记1

单词2 单词2翻译
例句2
补充笔记2
输出3个文件的完整笔记，笔记名对应音频名，输出完整笔记，因为内容较多，分3次输出。

## 课程内容
1. 初中
2. 高中
3. 四级
4. 六级

## 
1. 可以将视频笔记融合进词汇中
2. 检查是否存在，图标含义不够直观
3. 检查是否存在，图标没有居中，导致悬浮图标出现偏移

### 修复句子
对缺乏例句的进行补充，将例句错误进行改正，输出改正后或补充后的句子，保持原来的格式。
因为内容较多，分多次输出，首次说明分几次。

### 生成相关度最高的json
对单词进行分类，当某一类别大于8个单词，为具体的某一个类，比如月份。
深度分析后，找出最利于记忆的角度，生成相似且简单svg协助用户记忆，给出建议。

根据分类含义，每一个分类选择下面其中一种颜色。
### 1. 🔴 红色/玫红系 (冲突与否定 / Conflict & Negation)
用于标记表示**冲突、禁止、危机、批评、负面情绪或状态**的单词。这些词通常带有强烈的警示性或对抗性。

- `#ef4444` (鲜红)
- `#dc2626` (深红)
- `#e11d48` (玫瑰红)
- `#be123c` (深玫红)

### 2. 🟠 橙色/珊瑚系 (行动与激励 / Action & Motivation)
用于标记表示**动态行为、激励、沟通、社会互动或变革**的单词。这些词充满了能量，强调“做”和“影响”。

- `#f97316` (亮橙)
- `#ea580c` (焦橙)
- `#ff6b6b` (珊瑚红)
- `#c2410c` (铁锈橙)

### 3. 🟡 琥珀/金黄系 (核心与逻辑 / Core & Logic)
用于标记**核心概念、基本原则、经济、法律以及需要严谨判断**的单词。这些词是构建知识和论证的基础。

- `#f59e0b` (琥珀色)
- `#d97706` (金黄色)
- `#b45309` (深赭色)
- `#ca8a04` (暗金色)

### 4. 🟢 绿色/自然系 (成长与积极 / Growth & Positivity)
用于标记表示**成长、发展、健康、环境、合作以及积极成果**的单词。这些词汇传达了生命力、和谐与进步。

- `#10b981` (翡翠绿)
- `#059669` (深翡翠)
- `#22c55e` (草地绿)
- `#15803d` (森林绿)

### 5. 🔵 青色/蓝绿系 (科技与流程 / Technology & Process)
用于标记与**科学、技术、数据、客观流程和具体构件**相关的单词。这些词具有冷静、精确和系统化的特点。

- `#06b6d4` (青色)
- `#0891b2` (深青)
- `#14b8a6` (蓝绿)
- `#0f766e` (深蓝绿)

### 6. 💙 蓝色/靛蓝系 (思辨与抽象 / Thought & Abstraction)
用于标记**抽象概念、思维活动、心理、哲学和复杂策略**的单词。这些词汇指向更深层次的思考和认知。

- `#3b82f6` (天蓝)
- `#2563eb` (宝蓝)
- `#6366f1` (靛青)
- `#4338ca` (深靛)

### 7. 🟣 紫色/幻想起 (人文与艺术 / Humanities & Arts)
用于标记与**文化、艺术、文学、历史、社会以及主观想象**相关的单词。这些词汇富含创造性和人文色彩。

- `#8b5cf6` (紫罗兰)
- `#7c3aed` (深紫罗兰)
- `#d946ef` (紫红)
- `#a855f7` (亮紫)

### 生成文件用于单词项目
列出需要修改哪些文件以及新增文件，本次不输出代码。
输出json文件的完整代码，分多次输出，首次说明分几次。

### 修改svg
recall的svg不够直观好看，重新给出5个svg，viewBox="0 0 24 24"，5个不同的记起的图案，最后输出html可以直接预览
选择图2，重新给出imagery,description用于early,输出对应json对象

### 生成图标
生成5个背景色相同的svg图标，用于笔记软件，最后输出html可以直接预览

### 单词分类
希望对这些单词进行重新分类，方便记忆，类别尽量小一些，同一分类的单词关联度较大，单个分类单词个数大于5个单词，不好分类的统一放如other.json，本次进行具体分类，给出建议，本次不输出具体分类情况。

### 已有词汇分类体系
1.  **`topic_attributes_status` - 属性与状态 (Attributes & Status)**
    *   **描述**: 用于描述人或事物的内在品质、外在特征和所处状态的形容词。

2.  **`topic_city_infrastructure` - 城市设施 (City & Infrastructure)**
    *   **描述**: 从村庄到都市，探索构成我们生活环境的各类建筑与公共场所。

3.  **`topic_clothing_appearance` - 衣着与外貌 (Clothing & Appearance)**
    *   **描述**: 学习如何描述人们的穿着和外表特征，从衣服、裤子到发型。

4.  **`topic_dining_cooking` - 餐饮烹饪 (Dining & Cooking)**
    *   **描述**: 从厨房里的锅碗瓢盆，到餐桌上的美味佳肴，探索与吃相关的一切。

5.  **`topic_food_ingredients` - 食材原料 (Food Ingredients)**
    *   **描述**: 认识构成我们美味佳肴的基础——从田野里的蔬菜到各种肉类和水果。

6.  **`topic_geo_world` - 世界地理 (World Geography)**
    *   **描述**: 探索世界各大洲、国家及其相关概念，构建你的全球视野。

7.  **`topic_home_bedroom` - 居家与卧室 (Home & Bedroom)**
    *   **描述**: 围绕着家中最私密、最放松的空间——卧室，学习相关的物品和活动。

8.  **`topic_interaction_communication` - 互动与交流 (Interaction & Communication)**
    *   **描述**: 涵盖人与人之间的沟通、社交行为以及与物品的互动。

9.  **`topic_measurement_quantity` - 度量与数量 (Measurement & Quantity)**
    *   **描述**: 学习描述大小、多少、高低和增减等与度量衡相关的概念。

10. **`topic_mental_emotional` - 心理与情感 (Mental & Emotional)**
    *   **描述**: 探索内心的世界，学习描述思考、感受和情绪状态的词汇。

11. **`topic_month` - 月份 (Months)**
    *   **描述**: 英语月份名称源自古罗马历法，大多以神话人物、凯撒大帝或拉丁数字命名。

12. **`topic_movement_position` - 移动与位置 (Movement & Position)**
    *   **描述**: 学习描述动作、方向和空间关系的词汇，让你的语言“动”起来。

13. **`topic_nature_landscape` - 自然景观 (Natural Landscapes)**
    *   **描述**: 从高山到大海，从森林到田野，感受大自然的壮丽与宁静。

14. **`topic_other` - 综合 (Mix)**
    *   **描述**: 包含一些难以归入其他具体类别，但同样重要的基础词汇。

15. **`topic_people_roles` - 人物与角色 (People & Roles)**
    *   **描述**: 认识生活中的各种人物身份，包括家庭成员、职业和社会角色。

16. **`topic_study_hobbies` - 学习与娱乐 (Study & Hobbies)**
    *   **描述**: 涵盖学习用品、音乐、体育和休闲活动，丰富你的课余生活。

17. **`topic_time_logic` - 时间与逻辑 (Time & Logic)**
    *   **描述**: 掌握描述时间点的副词和表达抽象逻辑、规则与机会的名词。

18. **`topic_weather_seasons` - 天气现象 (Weather Phenomena)**
    *   **描述**: 描述晴、雨、雪、云等各种自然天气状况的词汇。










### 总结视频的课程
对mp3的内容进行总结内容，参考md文件的格式，一个词根作为一个部分
词根使用意境概括
单词的翻译，侧重于词根
例句的翻译，侧重于词根

### 调整词根
根据词根含义，每一个词根选择下面其中一种颜色。
### 1. 🔴 红色/玫红系 (Passion & Alert)
用于表达否定、危险或强烈的动作。
- `#ef4444` (鲜红 / Red 500)
- `#dc2626` (深红 / Red 600)
- `#e11d48` (玫瑰红 / Rose 600)
- `#be123c` (深玫红 / Rose 700)

### 2. 🟠 橙色/珊瑚系 (Energy & Warmth)
用于表达活力、向外或积极的意境。
- `#f97316` (亮橙 / Orange 500)
- `#ea580c` (焦橙 / Orange 600)
- `#ff6b6b` (珊瑚红 / Coral)
- `#c2410c` (铁锈橙 / Orange 700)

### 3. 🟡 琥珀/金黄系 (Caution & Value)
*注：已调暗亮度，避免在白色背景下看不清，确保不是淡黄色。*
- `#f59e0b` (琥珀色 / Amber 500)
- `#d97706` (金黄色 / Amber 600)
- `#b45309` (深赭色 / Amber 700)
- `#ca8a04` (暗金色 / Yellow 600)

### 4. 🟢 绿色/自然系 (Growth & Life)
用于表达生长、生命、肯定或进入。
- `#10b981` (翡翠绿 / Emerald 500)
- `#059669` (深翡翠 / Emerald 600)
- `#22c55e` (草地绿 / Green 500)
- `#15803d` (森林绿 / Green 700)

### 5. 🔵 青色/蓝绿系 (Flow & Ice)
用于表达流动、穿过或冷静的意境。
- `#06b6d4` (青色 / Cyan 500)
- `#0891b2` (深青 / Cyan 600)
- `#14b8a6` (蓝绿 / Teal 500)
- `#0f766e` (深蓝绿 / Teal 700)

### 6. 💙 蓝色/靛蓝系 (Depth & Sky)
用于表达空间、思考、向后或返回。
- `#3b82f6` (天蓝 / Blue 500)
- `#2563eb` (宝蓝 / Blue 600)
- `#6366f1` (靛青 / Indigo 500)
- `#4338ca` (深靛 / Indigo 700)

### 7. 🟣 紫色/幻想起 (Mystery & Royal)
用于表达神秘、变化、魔法或抽象概念。
- `#8b5cf6` (紫罗兰 / Violet 500)
- `#7c3aed` (深紫罗兰 / Violet 600)
- `#d946ef` (紫红 / Fuchsia 500)
- `#a855f7` (亮紫 / Purple 500)


## 批量操作
后续将输入大量的md文件用于生成data目录的新的json,不使用脚本生成
给出建议，本次不输出代码


分类优先已经存在目录
列出需要新增或修改的文件，本次不输出json数据


本次输出data/grade8/目录需要修改或新增的文件，暂不输出其它文件，输出完整json文件，因为数据较多，分多次输出，首次说明分几次。
```

---

## 📄 文件: 初中\01.md

---

```md
## 整体认识
单词 = 前缀+词根+后缀
词根：核心、灵魂
前缀：方向、情感
后缀：词性（名词、动词）

### re-
#### 向后
**review 回顾**
You should review what you **learned** last class.

**remain 保持**
10 years **have** passed. The town remains the same.

**recall 回忆；记起**
I am so sorry. I can't recall your name.

**reflect 反射；反映**
White can reflect heat.
The drop in consumer spending reflects concern about the economy.

**relief 宽慰；解脱**
He laughed in relief.

**relaxed 放松的**
Please be relaxed. **Your** daughter will be OK.

**regret 后悔**
I regret leaving school so young.

**receive 收到**
I received the package this morning.

**reply 回复（电话，短信，邮件等）**
My friend replied that he was not at home.

**respond 回复**
He responded that he didn't want to see anyone.

**refuse 拒绝**
The girl refused to be his girlfriend.

**report 报道**
According to recent news **reports**, they are under 18.

**return 回来；归还**
When can you return my books?
I didn't return home last weekend.

#### 再次
repeat 重复
Sorry, I didn't follow you. Can you repeat that?

request 请求（地位低向地位高）
They have made an urgent request for international aid.

require 要求
The rules also require employers to provide safety training.

reusable 可重复使用
Plastic bags are reusable.

recycle 回收
The company recycles beer bottles.

resolution 决心
Carol made a resolution to work harder at school.

remind 想起
The picture reminds me of the days in middle school.

repair 维修
My father is good at repairing furniture.

research 研究
It's a good idea to do some research before you buy a house.

### dis- 否定
discover 发现
The body was discovered in a field.

disagree 不同意
My parents disagree the marriage.

disappointed 失望
I am disappointed with the grade.

disbelief 不相信
I disbelief the God.

disappear 消失
My keys have disappear again.

dislike 不喜欢
Why do you dislike her so much?

### ex- 向外
express 表达
Bill's not afraid to express his opinions.

exchange 交互
We exchange gitfs at Christmas.

except 除了
Everyone passed the exam except him.

explanation 解释
Stop explaining.I don't believe your explanation any more.
```

---

## 📄 文件: 初中\02.md

---

```md
### in-
#### 否定
inexpensive 不昂贵
The watch is inexpensive.

inconvenient 不方便的
It is inconvenient to get there without a car.

independent 独立
She is an independent woman.

include 包括
The price includes the postage.

introduce 介绍
Let me introduce myself first.

### em-
#### 在...里面
embarrassed 尴尬的
Lily gets embarrassed if we ask her to sing.

embarrassing 使人害羞的
She asked me a lot of embarrassing questions.

### im-
#### 否定
impolite 不礼貌的
It is impolite to ask girls' ages directly.

impossible 不可能的
Nothing is impossible.

### un-
#### 否定
uncrowded 不拥挤
The bus is very uncrowded.

uncomfortable 不舒服的
The weather is uncomfortable in winter.

uneasy 不安心
He had an uneasy day at the company.

unexpected 出乎意料的
It is an unexpected result that he failed the exam.

unusual 不同寻常
It's unusual for Lucy to be late.

### ab-
#### 远离
absent 缺席
He has been absent from class for two weeks.

### sur-
#### 向上
surface 表面
The surface of the phone is so smooth.

### inter-
#### ...之间
international 国际间
He works in international business.

interpersonal 人际间
She has good interpersonal skills.

### com- con- co-
#### 共同
compete 竞争
We can't compete with them on price.

complete 完成
It took two years to complete the building.

### trans-
#### 穿过
translator 翻译员
She works as a translator.

transport 运输
The goods are transported to London.

### sup- sub-
#### 在下面
support 支持
Nobody supports him.

suppose 推断
I suppose you are right.

### pre-
#### 在...之前
prefer 更喜欢
I prefer staying at home to going out during such hot days.

president 总统
Mr. President, you have to make the call.

predict 预测
Newspapers predicted that Trump would be re-elected.

prepare 准备
The students are busy preparing for the final exam.

### dia-
#### 两者之间
dialogue 对话
Practise the dialogue with your partner.

### de-
#### 向下
delete 删除
I deleted the file by mistake.

decide 决定
I decided to learn English from Allen.

### en-
#### 使...
encourage 鼓励
We should encourage him together.

endanger 危及
Smoking endangers your health.

### op-
#### 相反
oppose 反对
The president opposed the medical reform plan.

opposite 与...对面
The bank is opposite the convenience store.
```

---

## 📄 文件: 初中\03.md

---

```md
--- START OF FILE 03.md ---

### -tion/-ion
#### 名词
education 教育
Education is the key to a happy life.

graduation 毕业
He graduated from Tsinghua University.

instruction 指示
We should follow the instructions on the screen.

suggestion 建议
Lily suggested meeting for a drink after work.
Here are some suggestions for further activities.

collection 收集
I love collecting coins.
I have a large collection of coins.

communication 交流
We communicated by e-mail.

Comparison 比较
The customer compares iPhone with Xiaomi Phones.

congratulation 祝贺
She congratulated me on my exam results.

### -ship
#### 名词
friendship 友谊
A lifelong friendship.

relationship 关系(爱情，亲情)
I have quite a good relationship with my parents.

### -ment
#### 名词
agreement 同意
I agree with what you said.

### -ness
shyness 害羞

kindness 好意/仁慈
I can't thank you enough for your kindness.

sadness 悲伤
We learned of his death with great sadness.

fairness 公平
Gaokao is a fair enough exam.

illness 病
He didn't come to class because of illness.

sickness 病
A sick dog.

### -ist
#### 专家
physicist 物理学家
I love physics and I dream to be a physicist.

chemist 化学家
I love chemistry and I dream to be a chemist.

scientist 科学家
I love science and I dream to be a scientist.

dentist 牙医
I'm going to the dentist this afternoon.

pianist 钢琴家
I have played the piano for 10 years.

violinist 小提琴家
I have been playing the violin for 5 hours.

terrorist 恐怖分子
We refuse to talk to terrorists.

### -ity
#### 抽象名词
abilities 能力
He showed his abilities as a leader.

electricity 电
electric toothbrush.
The farm has no electricity.

popularity 受欢迎
Hilary was popular at school.

creativity 创造性
Some people believe the universe was created by a big explosion.
This job is so boring. I wish I could do something more creative.

### -ess 女性
actress 女演员
Fan Bingbing is a famous actress.

waitress 女服务员
My first job was as a waitress.

goddess 女神
My first love is the forever goddess in my heart.

### -eer ...人
engineer 工程师
My father is a computer engineer.

pioneer 先驱
He is a pioneer of computer science.

### -ance
acceptance 接受
She didn't accept my flowers.

### -ation
invitation 邀请
My friend invited me for a drink last Sunday.

### -ure
pressure 压力
He took the exam under great pressure.
```

---

## 📄 文件: 初中\04.md

---

```md
好的，这是根据您的要求修正和补充后的内容，保持了原始文件的格式。

--- START OF FILE 04.md ---

### 形容词后缀
-al ...的

**environmental** 环境的
Everyone is responsible for protecting the environment.
Environmental protection is a global concern.

**accidental** 偶然的
Our meeting was purely accidental.

**by accident** 偶然地
I took your umbrella by accident.

**musical** 音乐的
I can't live without music.
He has great musical talent.

-y ...的
**salty** 咸的
Could you pass me the salt?
It is a little salty.

**crispy** 脆的
I love the taste of crispy bacon.

**noisy** 吵闹的
There's much noise outside. It's too noisy.

**sleepy** 瞌睡的
She feels sleepy when reading.

**thirsty** 渴的
be thirsty for sth 渴望
Can I have a glass of water? I'm really thirsty.
I am thirsty for knowledge.

-ous ...多的
**humorous** 幽默的
You are such a humorous guy.

**famous** 著名的
Peking University is the most famous one in China.

**dangerous** 危险的
Swimming in the river is dangerous.

-ful ...的
**careful** 小心的
Please be careful when you cross the street.

**helpful** 有帮助的
Reading aloud is helpful for English study.

**truthful** 真实的
Please give a truthful answer.

-ful ...的
**awful** 可怕的
The weather was awful yesterday.
He is a pretty awful driver.

**painful** 疼痛的
My arm is painful.

**harmful** 有害的
Smoking is harmful to your body.

**thankful** 感谢的
I am so thankful to my dad who taught me so much.

**wonderful** 精彩的
We had a wonderful time at the party.

**peaceful** 和平的
The park is a peaceful place to relax.

**shameful** 耻辱的
It's shameful to treat your pets like this.

**stressful** 充满压力的
Moving to a new city can be very stressful.

-less 无
**careless** 不小心
He made a careless mistake on the test.

**meaningless** 无意义的
Without context, memorizing a list of words is a meaningless task.

-able ...的
**valuable** 有价值的
The painting is valuable.

**believable** 可相信的
His excuse for being late was not very believable.

**enjoyable** 令人享受的
The concert was very enjoyable.

-ic ...的
**scientific** 科学的
We need scientific evidence to support this theory.

-ive ...的
**creative** 创造的
She came up with a creative solution to the problem.

-ly 形容词后缀（大多数为副词）
**lovely** 可爱的
What a lovely day!

**lively** 生机勃勃
The city has a lively nightlife.

**ugly** 丑陋的
The old building was ugly.

**friendly** 友好的
She is very friendly to me.

**likely** 可能的
It is likely to rain.

### 动词后缀
-ize ...化
**memorize** 记忆
She has a terrible memory for names.
She could memorize 500 English words per day.

### 综合后缀
-ward 方向
**forward** 向前 adv/adj
**backward** 向后 adv/adj
**upward** 向上 adv/adj
**downward** 向下 adv/adj
He moved a step forward. (adv. 向前地)
It was a forward step. (adj. 向前的)

-ate
**private** 私人的
privacy 隐私
This is a private conversation.
We should respect everyone's privacy.

-ish 像...一样的
**childish** 像小孩一样
Stop being so childish and accept your responsibility.

**foolish** 像傻瓜一样
It was foolish of me to trust him.

-ary
**documentary** 纪录片(n)，记录的(adj)
A local film crew is making a documentary about volcanoes.
We need documentary evidence to prove our case.
```

---

## 📄 文件: 初中\05-01.md

---

```md
### 词根
rect- 直，正
direct 指导
director 导演
direction 方向
Educational level has a direct effect on income.
James Cameron is a famous film director.
Which direction did they go in?

correct 改正
A man who corrects his mistakes is a real man.

sect- 切割
insect 昆虫
Some insects are good.

flu- 流
influence 影响
My middle school teacher has a big influence on me.

tend- 延申
attend 参加
Only 12 people attended the meeting.

pos- 放
pose 姿势
position 位置，姿势
Strike a pose.
Lie in a comfortable position.

spir- 呼吸
inspire 鼓舞，灵感
We need someone who can inspire the team.
The book was inspired by a real person.
```

---

## 📄 文件: 初中\05-02.md

---

```md
好的，以下是检查和修改后的句子，保持了原有格式：

## 基础必备
## 拟声，拟型
## 简单符合

boring 无聊（修饰物）
bored 无聊（修饰人）
The job was boring.
I am bored with the job.

carrot 胡萝卜
Rabbits love to eat **carrots**. (或 **carrot**，但复数更常用指食物)
She chopped up the carrots for the stew.

cousin 堂表兄弟姐妹
I have three **cousins**.
My cousin lives in London.

dictionary 字典
This English dictionary is very helpful.
I always look up new words in the dictionary.

erase 抹去
eraser 橡皮
He couldn't erase the image from his mind.
Children like to collect erasers.

favorite 最喜欢的
What's your favorite book?
Red is my favorite color.

January 一月
February 二月
March 三月
April 四月
May 五月
June 六月
July 七月
August 八月
September 九月
October 十月
November 十一月
December 十二月
My birthday is in May.

fun 有趣的
funny 滑稽(贬义)
My father is a fun man.
It is funny that the man wears like this.
We had a lot of fun at the party.

geography 地理
geographer 地理学家
I love geography very much and I want to be a geographer when I grow up.

habit 习惯
Study habits are very important.
Smoking is a bad habit.

library 图书馆
I like reading books in the library.

quilt 被子
pillow 枕头
I have a beautiful **quilt** and some lovely **pillows**.
Make sure to fluff up your pillow before bed.

relax 放松
You should learn to **relax** after a long time of work.

beach 海滩
Lying on the beach is very relaxing.
I am so relaxed when lying on the beach.
Let's go to the beach this weekend.

skirt 短裙（不是全身的）
dress 连衣裙
How much is the skirt/dress?
She was wearing a long floral skirt.

sock 短袜
Mum, where are my **socks**?
I need to buy some new sports socks.

subject 科目
term 学期
There are eight subjects for us to learn this term.

sweat 流汗
I sweat a lot in summer.
Your sweater is nice.
Running in the heat makes me sweat.
```

---

## 📄 文件: 初中\06.md

---

```md
好的，这是改正后的版本，保持了原有的格式。

---

tennis 网球
I used to play tennis with my friend when I was young.

wild 野生的
I love the wild horses in the picture. They are so lovely.

cross 跨过
across 跨过
Don't cross the road when the red light is on.
Don't go across the road when the red light is on.

crossing 十字路口
When you are at the crossing, please be careful.

actor 演员
actress 女演员
Robert Downey Jr. is a very successful actor.
This actress has a great figure.

afraid 害怕的
dark 黑暗
She is afraid of the dark.

Africa 非洲
African 非洲的
I have been to Africa and the African people are very friendly and welcoming.

arrive 到达
When will you arrive in Beijing?
I'll arrive there before 10 p.m.

Australia 澳大利亚
Australian 澳大利亚的
Australia is a big country like China.
Australians speak English.

Canada 加拿大
Canadian 加拿大的
Canada is next to the USA.
Canadians speak English.

away 远离
Stay away from the fire.

badminton 羽毛球
I often play badminton with my dad on weekends.

blonde 金黄色
Many Europeans have blonde hair.

blow 吹
candle 蜡烛
blow out 吹灭
The child blows out the birthday candles and makes a wish.

bowl 碗
A bowl of noodles is my favorite when I am hungry.

bridge 桥
The bridge is 2000 meters long.

bring 带来
Allen brought hope to me when I was desperate.

brush 刷
How often do you brush your teeth?
Twice a day.

butterfly 蝴蝶
The butterfly is so beautiful.

by 乘
My mum goes to work by bike every day.
My father often travels by airplane.

cabbage 卷心菜
Do you like eating cabbage?

cap 帽子
camp 营帐
I love this Nike cap.
We go camping every summer.

candy 糖果
Do you love eating candies?

center 中心
A spot is in the center of the circle.

cheap 便宜
expensive 贵的
The small bag is a lot cheaper than the big one.
The big bag costs 200,000 yuan and it's too expensive.

chess 国际象棋
chess club 国际象棋俱乐部
I have never played chess before.

cloud 云
cloudy 多云的
rain 雨
rainy 下雨的
It will be cloudy tomorrow.

sun 太阳
sunny 晴朗的
snow 雪
snowy 下雪的
It will be sunny tomorrow.

country 国家
countryside 农村
sea 海洋
seaside 海边
Life in the countryside is boring.

crime 犯罪
criminal 罪犯
The police arrived at the crime scene.
The criminal was arrested by the police.

curly 弯曲
I think curly hair is more popular than straight hair.

describe 描述
description 描述
Can you describe the phone?
This is the description of the phone.

delicious 可口的
The food is delicious.

dine 进餐
dining hall 餐厅
200 people can dine at the same time in the dining hall.

dish 盘子
You cook the food, and I'll wash the dishes.
```

---

## 📄 文件: 初中\07.md

---

```md
dragon 龙
Dragon Boat Festival 端午节
The Dragon Boat Festival can be dated back to the Zhou Dynasty.

dream 梦想
What's your dream?
I dream of being a movie star.

drum 鼓
I love playing the drums.

dumpling 饺子
Chinese people often eat dumplings when celebrating Chinese New Year.

early 早的
The early bird catches the worm.

enjoy 享受
I really enjoy my life now.

Europe 欧洲
European 欧洲的
Europe is divided into Eastern Europe and Western Europe.
The European economy is getting worse.

exercise 锻炼
Regular exercise is very good for our bodies.

feed 喂养
I like feeding the pigeons. It is so much fun.

fight 打架
The two men are fighting over a girl.

flag 旗帜
The flags are flying.
We salute the national flag.

follow 跟随
The lovely chicks are following their mother.

forest 森林
Thousands of animals live in the forest.

forget 忘记
I am sorry. I forgot your name.

front 前面
A car is in front of the house.

gift 礼物
present 礼物
I bought a birthday gift for my sister.

giraffe 长颈鹿
A giraffe's neck is very long.

guide 导游
I dream of being a tour guide.

guitar 吉他
My cousin plays the guitar so well.

hall 大厅
hallway 走廊
They are having a meeting in the hall.
Your son is running in the hallway.

high 高
The mountain is very high.

hospital 医院
My aunt works in the hospital.

host 主人
The host served us delicious food.

hotel 旅馆
I dream of staying in a five-star hotel one day.

ivory 象牙
The ivory trade is illegal in China.

jeans 牛仔裤
I don't like wearing jeans because they are too tight.

join 加入
Can I join you for a game?

juice 果汁
Which juice do you prefer, orange juice or tomato juice?

jump 跳跃
I'll take a photo of you when you jump.

kilometer 千米
The road is 1 kilometer long.

kitchen 厨房
My mum is making a meal in the kitchen.

kite 风筝
People often fly kites in spring.

koala 考拉
The koala is a symbol of Australia.
```

---

## 📄 文件: 初中\08.md

---

```md
language 语言
What language do you speak?
I speak Chinese.

lazy 懒的
laziness 懒惰
My dad is lazy.
His laziness is a big problem.

lovely 可爱的
The little girl is so lovely.

luck 运气
lucky 幸运的
luckily 幸运地
Good luck.
I am a lucky girl.
She passed the driving test luckily.

meat 肉
vegetable 蔬菜
To lose weight, I decided to give up eating meat and have vegetables instead.

medium 中等
My father is of medium height.

message 信息
When I get up every morning, there are so many messages to read.

miss 错过；想念
5 years ago, I missed you. Now I miss you so much.

mouse 老鼠
mice 老鼠（复数）
Most people don't like mice.

mountain 高山
There are so many mountains in Shanxi Province.

museum 博物馆
The museum has a large collection of photographs.

music 音乐
musician 音乐家
My sister-in-law is a musician and the music she plays is so nice.

nature 自然
natural 自然的
The student should develop some skills to live in nature. / in the natural world.

noise 噪音
noisy 吵闹的
There is so much noise outside. It's too noisy.

noodle 面条
rice 米饭
People from the northern part of China like to have noodles.

onion 洋葱
Fry the onion with meat.

order 点菜
Excuse me. Can I take your order now?
Can I order now?

pay 支付
payment 支付（名词）
I'll pay the bill.
He made a down payment on a new car.

pick 挑选；摘
pick up 捡起来
Please pick a card.
The little girl is picking up shells.

pet 宠物
I raised two pets, a dog and a cat.

piano 钢琴
I like playing the piano.

pool 水池
It is normal to have a swimming pool in the yard in Malaysia.

popular 受欢迎的
The Avengers are very popular in America.

pour 倒
porridge 粥
Pour some milk into the cup.
My mum often cooks porridge for us in the morning.

post 邮寄
post office 邮局
I need to post this letter.
Is there a post office near here?

potato 土豆
Do you like having potato chips?

practice 练习
Practice makes perfect.

problem 问题；困难
Do you have any problems?

quarter 四分之一
A quarter of the students have problems in pronunciation.

quiet 安静的
quietly 安静地
Please keep quiet. My mum is sleeping.

quite 相当
The movie is quite amazing.

race 竞赛
Do you like watching horse racing?

robot 机器人
There will be a robot in each family in the near future.

rope 绳子
The rope is very strong.

rule 规则
You must obey the rules of the game.

Russia 俄罗斯
Russian 俄罗斯的
Russian people are not afraid of the cold.

mouse
mountain
onion
pet
porridge
rope

lazy
laziness
luck
music
nature
noise
practice
problem
quite
russia
```

---

## 📄 文件: 初中\09.md

---

```md
scare 吓坏
scared 害怕的
scary 吓人的
You really scared me.
The movie is so scary.
I am scared of the dark.

shout 喊叫
shout at 对...喊
shout to 对...喊
My mum used to shout to me, "Bill, come home for dinner!" when I was a child.
My father never shouts at my mum.

shower 沐浴
Taking a shower before going to bed is quite relaxing.

shy 害羞的
She is quite shy with strangers.

sing 唱
singer 歌手
The singer is singing the famous song "Take Me to Your Heart".

size 大小
What size shoes do you wear?

skate 滑冰
Young people tend to skate in the park on weekends.

smart 聪明的
clever 聪明的
bright 聪明的
You are a smart girl.

snow 雪
snowy 下雪的
snowman 雪人
Children are making a snowman outside.

soon 不久
I'll be there soon.

soup 汤
Cantonese are good at making soup.

spend 花费
cost 花费
take 花费
I spend a lot of money on makeup every year.
My car cost me 200,000 yuan.

state 州
There are 50 states in America.

stay 停留
stay up late 熬夜
How long will you stay here?
Don't stay up late. It's bad for your health.

still 仍然
It's midnight, and he is still working.

straight 直的
I prefer straight hair to curly hair.

strict 严格的
Our English teacher is very strict with us.

symbol 象征
The dove is the symbol of peace.

take a message 捎口信
I am afraid he's not here today. Can I take a message?

take a walk 散步
People like taking a walk after dinner.

taste 尝
The strawberries taste good.

tent 帐篷
This tent can hold 4 people.

tired 疲劳的
tiring 令人疲劳的
I am very tired after a day of work.
Studying for 4 hours is very tiring.

tooth 牙齿
teeth 牙齿
Many people ask me why my teeth are so white.

true 真的
false 假的
Is it true that you're moving?
My answer is true and yours is false.
```

---

## 📄 文件: 初中\10.md

---

```md
uniform 制服
Most primary school students go to school in uniform.

village 村庄
villager 村民
There are 800 villagers in the village.

violin 小提琴
Few people can play the violin.

a few（少量）
I have a few friends in this city.

few（几乎没有）
He has few friends, so he often feels lonely.

warm 温暖
I like the warm weather in spring the most.

weather 天气
What's the weather like today?
How's the weather today?

wear 穿
What should I wear tomorrow?

wind 风
windy 刮风的
It's too windy today.

wish 希望（实现难度大）
hope 希望
I wish I could go to Tsinghua University.
I hope so.

yet 还(不是放句尾大概率是'但是'的意思)
I haven't had dinner yet.

zoo 动物园
There are 50 kinds of animals in the zoo.

right now 立刻
right away 立刻
You should go to bed right now.

create 创造
increase 增长
decrease 降低
Most westerners believe that God created the world.
The population continues to increase.
The number of students in this school is decreasing every year.

hunt 捕猎
In ancient times, people hunted for a living.

haunt 萦绕
She is haunted by the fear that her husband has an affair.

stuff 东西
staff 员工
I like my stuff.
This entire staff has done an outstanding job this year.

silence 沉默
silent 沉默的
The crowd kept silent when the president appeared.
There was a brief silence before anyone answered.

chance 机会
choice 选择
choose 选择
He seized the last chance.
He has to make some important choices.
Choose your favorite way to learn English.

cartoon 卡通片
I like watching cartoons very much.

vacation 假期
I hope to go to the seaside during the summer vacation.

bookcase 书架
He took a book from the bookcase.

notebook 笔记本
note 笔记
You can take notes in a notebook.

strawberry 草莓
straw 干草
berry 浆果
Most girls like eating strawberries.

pancake 烙饼
pan 平底锅
Pans can be used to make pancakes.

subway 地铁
The subway is very crowded in Guangzhou.

supermarket 超市
market 市场
She went to the supermarket with her mother.
```

---

## 📄 文件: 初中\11.md

---

```md
--- START OF FILE 11.md ---

able 能够的
ability 能力
I am able to do it.
I have the ability to do this job.

disable 不能够
disabled 不能够的
I've always wanted to be able to speak Japanese.
It will disable your computer.
Carter was disabled in the war.

act 行动
action 行动
action movie 动作片
activity 活动
If you act at once you can make it reality and succeed.
We have to take action.
an old action movie.
Everybody likes to join in this activity.

add
Can I add your wechat?
数字相加应该用add还是plus (数字相加通常用 **add**，例如：Two **add** three equals five.)

advice 建议
advise 建议
Your advice was a great help to me.
In fact, I advised them not to do that.

agent 代理人
agency 代理机构
My mum is an insurance agent.
My father runs an insurance agency.

agree 同意
agreement 同意
agreeable 同意的
I agree with her.
They had made an agreement.
My parents are quite agreeable to my studying abroad.

almost 差不多
He's almost as old as I am.（双as，第一个为副词，第二个连词）
Have you almost reached the target?

already 已经
When we got there, the train had already left.

although 尽管
He can fly, although he is a pig.

angry 生气的
anger 生气
Don't be angry with me.
"NO!" She shouted in anger.

apartment 公寓
She lives in a small apartment.

arm 胳膊
army 军队
Dave has a broken arm.
He joined the army when he was 17.

article 文章
There is an article on Baby talk in the newspaper.

as 作为（prep+n,连+句）
A flat stone was used as a table.
Do as I say!
Do it as I told you.
As long as they did this, all would be fine.

available 可得到的
WIFI is easily available in public.

become 变成
My dream is to become a beautiful butterfly.

begin 开始
beginning 开始
A new day has begun.
She's been here since the beginning of this year.

believe 相信
unbelievable 不可相信的
Do you believe me?
It is unbelievable, but I like that.

below 在...下面
The dog is sleeping below the desk.

better 更好的
good/well-better-best
My French is better than my Spanish.
You'll receive the best medical treatment.

bicycle 自行车
Shall we ride a bicycle there?

interested 有兴趣的
interesting 有趣的
What are you interested in?
This is an interesting story.

excited 感到兴奋的
exciting 令人兴奋的
We were very excited to see our work in the movie.
I've got some very exciting news for you.

break 打破
broke 打破 (过去式)
broken 破碎的
I had to break a window to get into the house.
The floor was covered in broken glass.

build 修建
building 建筑
It takes five years to build this road.
The offices are on the top floor of the building.

butter 黄油
He spread some butter on his bread.

calendar 日历
There was a calendar on the wall.

celebrate 庆祝
celebration 庆祝
How do you usually celebrate New Year?
We're having a small celebration for Dad's birthday.

certain 当然的
certainly 当然地
Are you certain about that?
They're certainly not mine.

character 人物
characteristic 特征
What does your character do in the story?
Everyone has his own characteristics.

cheap 便宜的
cheaply 便宜地
This book is very cheap.
The shop sells goods cheaply.

cheese 奶酪
Who moved my cheese?

chocolate 巧克力
Would you like a piece of chocolate cake?
```

---

## 📄 文件: 初中\12.md

---

```md
--- START OF FILE 12.md ---

choose 选择
choice 选择
Which one do you finally choose?
Could you tell me your choice?

clear 清楚的
这个和聪明有些像，聪明的单词？
clearly 清楚地
The question wasn't very clear.
I can see things clearly with the help of the glasses.

close 接近的
The ball is close to the hole.

coffee 咖啡
Do you like your coffee white or black?

college 学院
university 大学
Donna left school and went to art college.
She's at Cambridge University.

comedy 喜剧
comedian 喜剧演员
This is a highly successful comedy.
Chaplin was regarded as one of the greatest comedians.

comfortable 舒适的
comfortably 舒适地
Joyce has a comfortable apartment in Portland.
I was sitting comfortably on the sofa, reading a newspaper.

common 普通的
These are very common flowers.

concert 音乐会
Everyone except me went to the concert.

cook 烹饪
cooker 厨具
Every cook often cooks food in their own way.
The cooker is blue.

corn 玉米
All our chickens are fed on corn.

crowd 群
crowded 拥挤的
The crowd filled the room.
The train was very crowded, and we had to stand.

culture 文化
This is our culture.

decide 决定
decision 决定
Which one do you decide to have, an apple or a cake?
Please make your decision as soon as possible.

diary 日记
Linda kept a diary during the war years.

die 死亡
dead 死亡的
death 死亡
The rat died last night.
The rat was dead.
I'm sad because of its death.

differ 与...不同
different 不同的
difference 不同
This apple differs from the others.
They are different from each other.
What's the difference between them?

dig 挖
The tiger is digging a hole.

discuss 讨论
discussion 讨论
He refused to discuss the case publicly.
Many questions are under discussion.

duck 鸭子
This little duck is very cute.

earth 地球
There are many forms of life on our earth.

educate 教育
education 教育
educational 教育的
educator 教育者
It takes patience to educate children.
He received a good education.
This TV show is very educational.
My father was a respected educator.

enough 充足的
Is there enough time?

environment 环境
environmental 环境的
How do we change our environment?
An environmental group has been set up.

event 大事
A wedding is a big event in our life.

ever 从来
Have you ever been abroad?

expect 期望
Every mother expects her child to grow up happily.

experience 经验
experienced 有经验的
I know this by experience.
She's an experienced pilot.

expert 专家
How do you become an expert?

fantastic 极好的
You look fantastic!

fill 充满
full 满的
He filled the glass with water.
The kitchen was full of smoke.

film 电影
movie 电影
The film has just started.
We missed the start of the movie.

fresh 新鲜的
Do you eat plenty of vegetables and fresh fruit?
```

---

## 📄 文件: 初中\13.md

---

```md
glue 胶水
Pass me the glue.

grade 年纪
He got a grade A in maths.

guest 客人
customer 顾客
Most of the wedding guests had left.

hang 悬挂
hanger 衣服架
Hang the picture on the wall.
She took off her jacket and hung it on a hanger.

hardly 几乎不
I can hardly believe it.

health 健康
healthy 健康的
They drink to his health.
The child is very healthy.

hen 母鸡
cock 公鸡
The chicks gathered under the hen.

hobby 兴趣爱好
Do you have any hobbies?

hole 洞
The ball went into the hole.

honey 蜂蜜
honeymoon 蜜月
Where did you buy the honey?
They're going to honeymoon in Europe.

improve 提高
We all want to improve our lives.

information 信息
What can we do with this information?

joke 玩笑
That's only a joke.

junk food 垃圾食品
Don't keep junk food at your desk.

kid 小孩
I really want a kid.
Are you kidding me?

laugh 笑
laughter 笑
She laughed loudy.
I almost died of laughter.

little
less
least
I'd like to buy him a little something to thank him.
You should drink less.
Who knows most says least.

lose 失去
Do you know how to lose weight?

loud 大声的
aloud 大声地
loudly 大声地
His voice became loud.
"One minute" he said aloud.

machine 机器
I don't know how to use the machine.

magazine 杂志
That magazine comes out every Monday.

magic 魔法
magician 魔术师
Do you believe in magic?
Why do I call him a magician?

meal 餐
Have your last meal.

medicine 药
pill 药片
tablet 药片
This medicine is widely used.
He has to take pills every day.

menu 菜单
Could we have the menu, please?

mile 英里
We walked about half a mile.

mind 心智
What do you have in mind?
Never mind about that.

No, just go ahead/Not at all.
Sorry you'd better not.

mirror 镜子
miracle 神奇
They sell mirrors.

mistake 错误
He made a mistake.

mix 混合
Mix it up.

necessary 必须的
It's necessary to have some fresh fruit every day.

new 新的
news 新闻
Do you like my new dress?
Here's the sports news from Jane.

normal 正常的
All I want is to lead a normal life.
```

---

## 📄 文件: 初中\14.md

---

```md
once
He once lived in Shanghai.

opening 开幕仪式
He attended the opening of the new theater.

organize 组织
organization 组织
How do you organize your tem?
WHO is short for World Health Organization.

oven 烤箱
We need an oven.

own 自己的
I want to have a sister of my own.

paint 刷油漆
I need a can of blue paint.
I shall paint the gate green.

peel 剥皮
Please peel an apple for me.

pepper 胡椒粉
Mix up the salt with the pepper.

percent 百分之
I agree with you a hundred persent.

perform 表演
performance 表演
The children perform two plays each school year.
This evening's performance will begin at 8:00 pm.

person 个人
people 很多人
personal 个人的
He is a person one can trust.
THe car is for personal use ony.

physical 身体的
Youth is the time of physical growth.
physical and mental healthy.

pilot 飞行员
Jimmy is a pilot.

planet 恒星
They have discovered a new planet.

plant 植物
Don't forget to water the plants.
Her mother worked in this plant.

plate 盘子
He put food on the plate.

point 点
We want to be quite clear on this point.
He stood up and pointed his finger at me.

pollute 污染
pollution 污染
The factory pollutes the air and water.
Such music is pollution to the ear.

poor 贫穷
She comes from a poor family.

pot 锅
It's a pot of soup.

pour 倾倒
She poured coffee for everyone.

pretty 美丽的
She's a very pretty girl.
Pretty good.

primary 最早的
primary school 小学
They study at a primary school.

print 印刷
Could you print these for me?

prize 奖品
If you find the luck egg, you win a prize.

program 节目
Do you like this program?

promise 承诺
She broke her promise to me.
I promise to do all these things.

question 疑问
I have just one question.
No one has ever questioned her judgement.

quiet 轻轻的
quietly 轻轻地
I'll be quiet as a mouse.
I'm sorry, she said quietly.

result 结果
He put up the exam result.

rocket 火箭
The rocket was launched from a space research base.

role 角色
What is our role?

salt 盐
Put some salt in the soup.

sandwich 三明治
Give me the sandwich ,Papa.

saying 谚语
You can't judge a book by its cover, as the old saying goes.
```

---

## 📄 文件: 初中\15.md

---

```md
screen 屏幕
I watch more movies at home , on my TV screen.

self-improvement 自我救赎
Self-improvement could bring amazing results.

send 发送
If we both like it, we can send it to more people.

serious 严肃的
seriously 严肃地
I'm not kidding, I'm serious.
Seriously, what does he want to do?

serve 提供
service 服务
servant 仆人
Who will I serve?
What do you think of our service?
How can you know if you have the heart of a servant?

shake 动摇
The whole house started to shake.
Confidence began to shake.

shape 形状
What shape is the table?

share 分享
How do you share your toys with others?

same 一样的
similar 相似的
They look the same.
They had similar aims.

simple 简单
It is a simple picture of butterfly.

soap 肥皂
I often wash my face with soap.

spoon 勺子
She feeds the baby with a spoon.

stand 忍受
Can you stand the pain?
He could not stand when he reached the top of the hill.

sugar 糖
She added some sugar to her coffee.

surprise 惊讶
surprised 惊讶的
surprising 惊讶的
To my surprise, she failed the exam.
I was surprised at the news about his death.
She told me a surprising thing.

swing 秋千
Kids are playing on the swing
Let your arms swing as you walk.

teenager 青少年
As a teenager, he started writing poetry.

temperature 温度
Her temperature came down in the evening.

theater 剧场
She's been working in the theatre for over thirty years.

through 穿过
The dod jumps through the circle.

ticket 票
How much is the ticket?

touch 触摸
touching 感动的
A little hand touched my finger.
The story is touching.

trade 贸易
trader 商人
Trade is the lifeblood of our country.
The company trades in silk and tea.
The trader is always showing dishonesty.

tradition 传统
traditional 传统的
Where does this tradition come from?
Do you like Chinese traditional silk?

trust 相信
I trust him completely.
How can I rebuild my trust in him?

turkey 火鸡
Did they eat turkey?

twice 两倍
Have the pill twice a day.

umbrella 雨伞
Take this umbrella with you.

unless 除非
if ... not ...
She won't go to sleep unless you tell her a story.

wallet 钱包
I've only got about 10 yuan in my wallet.

wet 湿的
It's very wet outside.
I am wet through.

win 赢
winner 胜利者
How can I win back her trust?
In every game there can only one winner.

bad 坏
badly 
worse 
worst
I have some bad news for you.
Rob did very badly in the history exam.
The traffic  is much/a lot/far/rather worse after five o'clock.
The UK is neither the best nor the worst.
```

---

## 📄 文件: 初中\16.md

---

```md
yogurt 酸奶
What about adding some fruit in yogurt?

broad 宽广的
aborad 国外地
We went along a broad road.
I've never lived abroad before.

accident 事故
incident 事件
A car accident.
She handed in a report of the incident.

achieve 取得
achievement 成就
How do you achieve more in less time?
We try to celebrate the achievements of our students.

actual 实际的
actually 实际地
I am not joking. Those were his actual words.
What time are you actually leaving?

adult 成人
adolescent 青少年的
Some children find it difficult to talk to adults.
Adolescent problems should be treated seriously.

against 和... 相反
Are you against it or for it?

alarm 闹钟
I've set the alarm for 7 o'clock.

allow 允许
I don't allow the cat in the bedrooms.

alone 独自地
lonely 孤独的
She lives alone.
He led a lonely life with few friends.

amaze 使某人惊讶
amazed
amazing
Dave amazed his friends by getting married.
I'm amazed that you've never heard of Jay Chou.
Where are these amazing photos?

among 在...之中
The girl quickly disappeared among the crowed.

amuse 逗某人开心
amusement 开心
amusement park 游乐场
He made funny faces to amuse the children.
She looked at him in amusement.
Why do you want to build an amusement park.

ancient 古老的
Some ancient towns have walls around them.

apart 分离的
We had to pull them apart.

area 地区
Fire destroyed several houses in the area.

argue 争吵
We began to argue

Asia 亚洲
Asian 亚洲的
There's a map of Asia on the blackboard.

sleep 睡觉
asleep 睡觉的
Did you sleep well?
My mum fell asleep.

wake 醒来
awake 醒来的
James usually wakes up early.
I hope he's awake up.

band 乐队
bandage 绷带
The band gave an exciting performance.
Do you have a bandage?

beat 敲打
hit 撞击
They beat him down to the ground.
He was hit by a car.

beauty 美
beautiful 美丽的
Her beauty attracted everyone at the party.

belong 属于
The book belongs to Dan.

blind 瞎的
blindness 盲
The accident left him blind.

blood 血
bleed 流血
Her body was found in a pool of blood.
Your nose is bleeding.

borrow 借
lend 借
Can I borrow your pen for a minute?
Can you lend me $10 until tomorrow?

brave 勇敢的
It was brave of you to speak in front of all those people.

break 打破
broken 破碎的
We need someone to break the ice.
Let's take a ten-minute break.
Her arm was broken.

breath 呼吸
breathe 呼吸
I'm going outside for a breath of fresh air.
They know how to breathe.

bright 明亮的
The weather was bright and sunny.

camera 照相机
Is this camera new?
```

---

## 📄 文件: 初中\17.md

---

```md
carry 携带
take sb to ...
Let me carry that for you.

cause 引起，原因
What caused you to change your mind?
What is the cause of this problem?

cent 分
century 世纪
I will not take a cent less.
The church was built in the 13th century.

certain 确定的
certainly 确定地
I'm not certain when it will be ready.
They're certainly not mine.

challenge 挑战
The company is ready to meet the challenged of the next few years.
Challenge your mind and body.

cheat 欺骗
Why did you cheat in the exam?

check 检查
Did they check yours?
Have a check in your bag first and see if it's there.

chore 杂物
I get up and do the chores before I go out.

classic 经典的
classical 古典的
Do you like classic music?
classical music.

clear 干净，清楚
It's Kelly's turn to clear the table.
The question wasn't very clear.

climb 攀登
climber 攀登者
This hill is hard to climb.
He was an experienced climber.

cloud 云
cloudy 多云的
What's the shape of the cloud?
It was cloudy yesterday.

complete 全部的
completely 全部地
He's a complete stranger to me.
I trust him completely.

condition 条件
The living condition here is so poor.

continue 继续
Close this window, so you can continue to draw.

control 控制
How do I control myself?

copy 复制
Could you copy this letter and send it out,please?

cough 咳嗽
He's got a bad cough.
Do you cough?

count 数
countdown 倒计时
It's quicker to count by tens.
Ok, here's the countdown.

couple 一对
a couple of ...
That couple have a very happy life.
You'll be all right in a couple of days.

crayon 彩色铅笔
Mary has a box of crayon.

data 日期
What's the date today?
I have a date.

deaf 聋的
He seems to be deaf.

deal 交易
It's a deal.
We ofen deal with him.

decide 决定
decision 决定
She should decide what to do with the money.
This is your decision.

deep 深的
What a deep river!

depend 依靠
I have to depend on these foods.

desert 沙漠
It was the voice of the desert.

develop 发展
development 发展
Chicago developed into a big city in the late 1800s.
What is the true meaning about some development in your speech?

difficult 困难
difficulty 困难
It used to be difficult to get drinking water here.
He got the lesson without difficulty.

due 到期的
When does the bill become due?

emperor 皇帝
king 皇帝
He must be the poorest emperor ever.
The King trusted him.

equator 赤道
A small village is near the equator.

fan
Ella is a big fan of World Cup.
```

---

## 📄 文件: 初中\18.md

---

```md
fear 害怕
Women feared to go out at night.
Fear caused his hair to rise.

feel 感觉
feeling 感觉
Do you still feel hungry?
I understand the feeling.

fever 发烧
She's running a fever.
She has a fever.

fiction 小说
This is a piece of historical fiction.

finger 手指
thumb 母指
index finger 食指
middle finger 中指
ring finger 无名指
small finger 小拇指
We ate with our fingers.

fit 适合
His clothes did not fit him very well.

fix 修理
Now go and fix that broken washing machine!

fold 折叠
folder 文件夹
Fold the card.
Put the card in the  folder.

force 力量
What force is this?
Force yourself to do more.

forever 永远地
They will live forever in our hearts.

fox 狐狸
A fox cannot hide its tail.

freeze 冷冻
freezer 冰箱
freezing 冷冻
When we freeze water, it turns into ice.
Clean your freezer.
It's freezing in this house. Can I turn on the heating?

France 法国
French 法语
They come from France.
She is French and she speaks French.

Germany 德国
German 德国的
Do you still live in Germany?
Are you German?

gold 金子
I have a gold watch.

government 政府
govern 管理
She was a woman of high position in the government.
Who governs this country?

ground 地面
He lay on the ground.

guess 猜测
She guessed that she would win the game.

gun 枪
Jake was pointing a gun at the door.

hate 恨
You know how I hate the dessert.

heavy 重的
heavily 大量地
How heavy are you?
They are heavy.
It's been raining heavily all day.

hide 隐藏
Hearing someone come in, she hid herself behind the door.

hold 握
Could you hold my bad for me?

honest 诚实的
honesty 诚实
He was a hard-working, honest man.
I would never question his honesty.

hurry 匆忙
be in a hurry
If we hurry up, we'll get there in time.

hurt 弄疼
I fell down and hurt my leg.

ice 冰
icy 冰的
Would you like some ice in your drink?
Icy roads are a hidden danger to drivers.

image 图片
imagine 想象
imagination 想象
I cant image him without beard.
She has plenty of imagination.

India 印度
Indian 印度的
Why do you come to India?
I am India.

instead 代替
instead of 代替
If Jordan can't attend the meeting, I could go instead.
jam didn't  study law. Instead, he decided to become an actor.
You probably picked up my keys instead of yours.

invent 发明
invention 发明
inventor 发明家
Who invented the Internet?
What is the greatest invention in you opinion and why?
Do you want to become an inventor?

island 岛
Every island has its name.

Japan 日本
Japanese 日本的
He went ot Japan.
Do you like Japanese culture?

journey 旅行
trip 短途旅行
tour 转一圈
travel 出去一趟
The journey starts here.

joy 愉快
It was her pride and joy.
```

---

## 📄 文件: 初中\19.md

---

```md
junior 初级的
senior 高级的
Diana is a junior doctor.
They have a good senior management team.

keeper 饲养员
The animal keeper feeds his animals with much love.

kilo 千克
Shed came back with a kilo of meat!

knee 膝盖
kneel 跪下
He knelt on the ground.

knife 刀
The knife cuts very well.

laugh 笑
laughter 笑
Maria looked at him and laughed.
He shook with laughter.

lead 带路
He led the way through the street.

lie 平躺
lie down 躺下
He finally became so weak that he had to lie down.

magic 魔法的
magician 魔术师
His best magic trick is sawing a lady in half.

mark 标记
remark 评论
His feet left dirty marks all over the floor.
I've marked the pages you need to look at.

marry 结婚
married 结婚的 
He married Betty in 1925.
Are you married or single?

match 火柴
Don't let your children play with matches.
Match the photo with the word.

memory 记忆
memorize 记忆
He has a good memory.
The best way to memorize English words is reding aloud.

mess 乱
in a mess 乱七八糟
The room was in a mess.

modern 现代的
She loves modern music.

nature 大自然
natural 自然的
You like nature, right?
This would be natural.

neck 脖子
My neck hurts every day.

neighbor 邻居
neighborhood 小区
My neighbor is a teacher.
I often take a walk around my neighborhood after dinner.

nervous 紧张的
She was so nervous about her exams that she couldn't sleep.

notice 注意到
I didn't notice any smoke.
The notice on the wall said 'No smoking'.

nurse 护士
His wife is a nurse.

object 物品
a small metal object.

ocean 海洋
I like to wim in the ocean when it's warm enough.

offer 提供
Can I offer you something to drink?

oil 油
The watch wants oil.

own 拥有
owner 拥有者
Many more people now own their own homes.
I met the owner of the local hotel.

page 页数
Please turn to page 12.

part 分开
aprt 分开
The crowd parted to let him through.
Though we are aprt, he is always in my heart.

passage 文章
He read out a short passage from the Bible.

perfect 完美
His English is perfect.

population 人口
Nearly 70 percent of the population still live in the countryside.

prince 王子
princess 公主
There was once a poor prince.
"I love you, no matter what happens" said the princess.

progress 进步
This is progress.
Her English progressed quickly.

proper 恰当的
Everything was in its proper place.

protect 保护
protection 保护
Are we doing enough to protect the environment?
It is clear that the primary duty of parents is to provide protection for our children.

provide 提供
They provided him with a car.

province 省
state 州
By the way, which province are you from?
She teaches in a state university.
```

---

## 📄 文件: 初中\20.md

---

```md
pupil 小学生
About 20 pupils study music here.

rise 升起
raise 养育
The sun rises in the east.
I raise to go abroad.

rapid 迅速的
The patient made a rapid recovery.

realize 认识到
realize one's dream 实现某人理想
I realized my mistake later.
I decide to study harder to realize my dream.

recent 最近的
recently 最近地
What have you been up to recently?

record 录制
Is the machine still recording?
I spent a lot of time listening to records.
break the record.

regard 把...认作
Lily regards me as her own sister.

risk 冒险
They may even risk losing their lives.

rock 岩石
I found an ant beside the rock.

rubbish 垃圾
liter 随手垃圾
What do you do with all those rubbish?

save 营救
safe 安全的
safety 安全
He saved the child.
Your family are all safe.
We were able to watch the lions in complete safety.

sand 沙
We were just sitting on the sand.

satisfy 让某人满足
satisfy 满足的
satisfaction 满足
This kind of programme always satisfied the public.
I am satisfied about everything.
Everyone wants to get satisfaction out of his or her job.

scar 疤痕
scarf 围巾
Did you have this scar before?
She is wearing a silk scarf.

see 看见
scene 场景
scenery 风景
I expect to see my unclue.
I have a picture of the whole scene at home.

shine 照耀
sunshine 阳光
The sun was shining.
She brought sunshine into our-life.

shirt 衬衫
T-shirt T恤
What color is your shirt?
She was wearing jeans and T-shirt.

shock 震惊
shocked 震惊的
The news of his death came as a great shock to everyone.
He is shocked at what happened to his son.

shoot 射击
I know how to shoot and I shoot well.

sign 标记
signal 信号
There is a "No Smoking" sign on the wall.
The signal is bad.

silly 愚蠢的
Stop asking silly questions.

situation 情况
I explained the situation to everyone.

skill 技巧
He plays the piano with great skill.

 snack 小吃
Most young people love eating snacks.

social 社会的
society 社会
We should organize more social events.
This is our society.

soft 软的
sofa 沙发
Would you like some soft drink?
I bought a new sofa.

sore 疼痛
I had a sore throat.

southern 南方的
northern 北方的
eastern 东方的
western 西方的
The farmers live in the eastern part of England.

southwestern 西南的
southeastern 东南的
northeastern 东北的
northwestern 东南的
There's town in northeastern Canada.

square 正方形
It's a large square room.

stick 小棍子
He picked up a stick.
The boy sticks his finger into his nose.
Someone sticks posters all over the walls.
Once you decide to break a bad habit, stick with your decision.

stone 石头
The floors are make of stone.
The table is make of wood.
The paper is make from wood.

strange 奇怪的
It's strange that we've never met before.

stupid 愚蠢的
Whose stupid idea was this?
```

---

## 📄 文件: 初中\21.md

---

```md
succeed 胜利
success 胜利
successful 胜利的
It was a good try, but it didn't succeed.
The experiment was a big success.
The operation was successful.

sweep 扫
wipe 擦眼泪
I often sweep the floor after school.

tail 尾巴
It has a big tail.

technology 科技
In fact, we already have the technology to do so.

the Pacific Ocean 太平洋
the Atlantic Ocean 大西洋
Welcome to this this side of the Atlantic Ocean!

theme 主题
topic 话题
We have a new theme.

thick 厚的
thin 薄的
Amy held a thick book under his arm.
She's only waring a thin summer jacket.

throw 扔
throw away
How far should I throw this ball?

throat 喉咙
She cleared her throat, and started singing.

toilet 厕所
I need to go to the toilet.

tool 工具
The shop sells garden tools.

tour 旅行
tourist 旅行者
tourism 旅游业
We tour by car every summer.
Are you a tourist?
Tourism is a large industry inCanada.

tower 塔
The Tower of London stands in the East End of London.

train 训练
training 训练
She's training to be a doctor.
His training fits him for the job.

type 类型
kind 类型
typical 典型的
I've already seen a few movies of this type.
The question is small but typical.

voice 声音
accent 口音
I know her by her voice.

volunteer 志愿者
I volunteer because I have the time.
She now helps in a school as a volunteer three days a week.

waste 浪费
They will only waste your time and money.

weak 虚弱的
He is not so weak as he looks.

weigh 称重
weight 重量
The young birds weigh only a few grams.
Gas has hardly any weight.

whale 鲸
In another there is a baby whale.

wheel 车轮
The wheel of the car has come off.

wild 野生
We saw two wild cats.

wood 木头
wooden 木制的
Her house was made of wood.
There are many wooden benches in the park.

yard 院子
yard sale 庭院拍卖会
I never went back to that yard.
Have you ever thought about having a yard sale to sell  your things?
```

---

## 📄 文件: 初中\22.md

---

```md
拟声拟型
catch 抓住
I didn't catch the early bus.

talent 才能
talented 有才能的
Your brother is a man of many talents.
This is a history of a very talented person.

bamboo 竹子
Everything there is made of bamboo.

treasure 财富
Blood and treasure are the costs of war.

简单符合类
daytime 白天
I can't sleep in the daytime.

halfway 中途的
I give up halfway through the marathon.

hardworking 辛勤的
If my boss is watching, I'm very hardworking.

headmaster 校长
We will send a present to our headmaster.

housewarming 乔迁聚会
Would you like to join the housewarming party this Friday night?

housework 家务事
homework 家庭作业
schoolwork 作业
I didn't do anything, even housework.
Go on with your homework!
My mother would help with my schoolwork.

popcorn 爆米花
pop 砰
People love eating popcorn when watching movies.
A balloon popped.

self-improvement 自我提升
Self-improvement could bring amazing result.

sitcom 情景喜剧
Half of Americans love watching sitcoms.

upset 不安
What makes you so upset?

watermelon 西瓜
What a big watermelon.

bedroom 卧室
living room 客厅
bathroom 卫生间
He found her in the bedroom.
What a beautiful living room!
She went to the bathroom.
What + a + adj + n!

birthday 生日
Its my birthday tomorrow.
What's your date of birth?

childhood 童年
I had a very happy childhood.

flash 闪光
flashlight 手电筒
Lightning flashed overhead.
We need to bring a flashlight.

headache 头疼
ache 疼
She has a headache.
Every bone in my body seems to ache.

hometown 家乡
What do you think of the future of your hometown?

man-made 人造
It is the laggest man-make lake in Europe.

midnight 午夜
They went home at midnight.

moonlight 月光
They walked along the road in the moonlight.

nosebleed 鼻血
Mike has a nosebleed.

mooncake 月饼
Would you like a mooncake?

railway 铁路
The railway was opened to traffic last year.

rainstorm 暴风雨
He arrived home in a rainstorm.

stepmother 继母
stepfather 继父
stepsister 继姐/妹
stepbrother 继兄/弟
Your stepmother told me about your problem at school.

stomachache 胃疼
You'd better see a doctor about that stomachache.

toothache 牙疼
My mother has a serious toothache.

sunburned 晒伤
He was heavily sunburned.

underwear 内衣
Nylon underwear washes well.

nowadays 如今
I like those internet phrases nowadays.
```

---

## 📄 文件: 初中\23.md

---

```md
loud 大声的
aloud 大声地
loudly 大声地
Turn down the TV, it is too loud.
"Why?" she asked  aloud.

pronounce 发音
pronunciation 发音
How do you pronounce this word?
His pronunciation is not very good.

sentence 句子
Can you read this sentence for me?

patient 有耐心的
She sat by the patient.
We must be patient with children.

secret 秘密
This is my little secret.
They found a secret place.

grammar 语法
How do you like the English grammar book?

note 笔记
take notes 做笔记
Can I borrow your notes?
The teacher noted that Miller had no mistakes.

pal 朋友
penpal 笔友
She received an em-mail from her pal.
Everyone should have a penpal.

pattern 模式
Weather patterns have changed in recent years.

attention 注意
She tried to pay attention to what he was saying.

connect 连接
Can you connect it with another one?

know 知道
knowledge 知识
Who knows the answer?
Knowledge is power.

wise 明智的
wisely 明智地
clever
smart 
intelligent
bright
She is a wise woman.
Use them wisely in the classroom.

lantern 灯笼
Light the lantern, take it and go down.

relative 亲戚
relation 关系
relationship 关系
Most of her relatives were able to come.
teacher-student relations.
They are in relationship.

folk 民间的
Do you like folk music?

steal 偷窃
He stole money from his parents.

lay 放置
lay out 布置
He laid his hands on my shoulder.
The hen laid four eggs yesterday.
Grace laid out the knives and forks on the table.

dessert 甜食
desert 沙漠
Would you like some dessert?

tie 领带
That tie goes well with your shirt.
I tie my hair back when I'm running.

ghost 鬼
I do not believe in ghost.

trick 把戏
Your trick has been discovered.

treat 招待
How do you treat others?

spider 蜘蛛
A spider has eight legs.

Christmas 圣诞节
Are you going home for Christmas.

lie 躺
Lie flat on the floor.

novel 小说
fiction 虚幻小说
The novel is worth reading.

eve 前夕
We're arriving on Christmas Eve.

punish 惩罚
punishment 处罚
They were punished by the teacher.

warn 警告
warning 警告
I warned you not to walk home alone.

present 现在，礼物
He gave her a beautiful present.
He is at present in Shanghai.

warm 温暖
warmth 温暖
They made a fire to keep warm.
Smile can pass warmth.

spread 转播
Bad news spreads fast.

stamp 邮票
Im interested in collecting stamps.

pardon 原谅
pardon me 原谅我，再说一遍
Please pardon me for not arriving soon.
```

---

## 📄 文件: 初中\24.md

---

```md
norm 标准
normal 正常的
normally 通常地
It is normal to feel anxious before exam.

rush 仓促
He goes to work in a rush.

center 中心
central 中心的
It's in the center of the city.
I live with my grandparents in Central London.

nearby 附近的
She came from a nearby village.
Do you live nearby?

clerk 职员
The clerk is working hard.

address 地址
I have her address.
How should I address her?

course 课程
class 一节课
The vocabulary course is great.

score 得分
She scored 100 in the test.
What's the score?

Asia 亚洲
Asian 亚洲的
The teacher drew a map of Asia on the blackboard.

deal 处理
deal with 处理
I'll deal with the children later.

guard 守卫
There are two guards on duty outside the building.
Many parents want to guard their children from any danger.

speak 说
speech 演讲
speaker 讲话者
Do you speak English?
Each child had to give a short speech to the rest of the class.
The speaker laughed.

Europe 欧洲
Europe 欧洲的
They are going to tour Europe.
He's European.

Africa 非洲
African 非洲的
She comes from Africa.
She's African.

ant 蚂蚁
Ants are social insects.

seldom 很少
rarely 很少
I seldom have lunch at home.

boarding school 寄宿学校
board 登机
She and her brother are both at boarding school.
We boarded the ship.
I've put a list of names up on the board.

pride 骄傲
proud 骄傲的
take pride in..
be proud of ...
Their son is their pride and joy.
He takes great pride in his children's achievements.
We are proud of ourselves.

introduce 介绍
introduction 介绍
May I introduce myself? My name is Lily.
Peter, are you going to make an introduction?

coin 硬币
There is a coin on the ground.

fork 叉子
Put the knives and forks on the table.

blouse 衬衫
Whose blouse is this?

gold 金
silver 银
bronze 铜
steel 钢
iron 铁
She won a gold medal.
The tube is made of steel.

cotton 棉花
This cloth is made of cotton.

fair 交易会
Have you ever been to spring fair?

grass 草地
I walked across the grass.

leaf 树叶
Leaves begin to fall in autumn.

produce 生产
product 产品
production 生产
productive 多产的
That factory produces cars.
How do you sell your products?
We lead in the coal production.
I should be doing something productive.

wide 宽广的
widely 宽广地
How wide is the door?
The song is becoming widely popular.

process 过程
The process of making cheese is complicated.
Cheese may be processed in many ways.

pack 打包
package 包裹
Could you pack it for me?

local 当地的
He's a local boy.

brand 牌子
What brand is your car?

avoid 避免
How can you avoid this?

mobile 移动的
May I use your mobile phone?

boss 老板
I'll have to ask my boss for a day off.

material 材料
The material are for you to make dumplings.
Reading/listening materials.
```

---

## 📄 文件: 初中\25.md

---

```md
cap 帽子
capital 首都
He put his cap on the chair.
Beijing is the capital of China.

glove 手套
We can keep the gloves.

form 形成，形状
shape 形状
The main stair was in the form of a big 'S'.
50 states form the US
Her shape is hot.

clay 粘土
He rolled the clay into a ball.

celebrate 庆祝
celebration 庆祝
How do you usually celebrate New Year?
We're having a small celebration for Dad's birthday.

scissors 剪刀
a parts of scissors
a parts of socks
a parts of shoes
a parts of pants
We cut paper and cloth with scissors.

history 历史
historical 历史的
historian 历史学家
It is American history.
It is important to read the novel in its historical background.
I am a historian, and I teach in an American university.

heat 加热
Ice needs heat to melt.
water heater.

heel 脚跟，鞋根
high heel 高跟鞋
My heel hurts.
Many girls dream of having a pair of beautiful high heels.

style 款式
kind 类型
Do you like this dress style?

project 项目
program 项目（偏小，偏抽象）
He designed a new plan for the project.

pleased 满意
pleasure 高兴的
satisfied 满意
I was pleased with the result.
It's my pleasure.

zipper 拉链
They have put a zipper on it.

list 列表
to-do list 代办事项
Make a shopping list at first.

mention 提到
Don't mention this problem this evening.
Don't mention it.

rule 统治
ruler 统治者
Queen Victoria ruled England for 64 years.
Her brother is king, but she is the real ruler.

boil 煮沸
boiling 沸腾的
The water boiled at 100°C.
The kettle is boiling.

ball 球
balloon 气球
belly 肚子
belt 腰带
He has a big round belly.
Please fasten your seat belt.

bowl 碗
boil 煮沸
a bowl of noodles.
Boil the water before drinking it.
Can I open a windows? It's boiling here.
a boiled egg.

breast 胸部
bread 面包
These bras are specially designed for women with large breasts.

trade 贸易
Lets make a trade.
They had to travel into town to trade the produce from their farm.

doubt 怀疑
without doubt 毫无疑问
There is no reason to doubt his honesty.
Without doubt, he is right.

fridge 冰箱
My parents bought this fridge last year.

lock 锁
Did you lock your car?

ring 响
Just ring if you need anything.

earthquake 地震
The earthquake killed 30,000 people.

sudden 突然的
all of a sudden 突然
All of a sudden, the lights went out.
Her death was sudden.

bell 钟
She rang the bell.

biscuit 饼干
cookie 曲奇饼
Would you like some cake or biscuit?
I would like a glass of milk and a cookie.

instrument 仪器
instrumental 工具的
Are you able to use this instrument?
Try our best to control the instrumental record.

customer 客户
guest 宾客
She was the only customer.

divide 分开
How should we divide the biscuit?

basket 篮子
basketball 篮球
There is a basket full of vegetables.
I love playing basketball when I wa in college.

hero 英雄
His father was a war hero.

profession 职业
professional 职业的
Her profession is a teacher.
You may need to seek professional help.

near 在...附件
nearly 几乎
They live near London.
It took nearly two hours to get here.

license 证件
While driving a car, you have to carry you driver's license with you.

safe 安全的
safety 安全
Your family are all safe.
I will answer for her safety.

smoke 吸烟
I don't smoke and I don't drink much.
The room was full of smoke.

ear 耳朵
earring 耳环
We hear things with our ears.
She was waring a pair of beautiful earrings.

fly 飞
flash 闪
She's flying back to the United States tomorrow.
Lightning flashed overhead.
```

---

## 📄 文件: 初中\26.md

---

```md
tiny 微小
The forks were tiny.

field 田地
He's working in the cotton fields.
football field.
He is an expert in hi field.

hug 拥抱
Paul gave me a big hug.
They hug each other.

lift 举起
She lifted her hand once again.
The lift is coming.

teen 十几岁
teenager 青少年（13-19）
She was in her teens when she met him.
More and more teenagers love the books.

poem 诗
poet 诗人
He read the poem aloud.
The poet composed a new poem.

community 社区
neighborhood 社区
We meet once a month to discuss community problems.

chance 机会
choose 选择
This is your last chance.

manage 管理
manager 经理
manage to do 努力做什么
try one's best to do 努力做什么
He was asked to manage a new department.
He becomes the new manager.

truck 卡车
He is a struck driver.

picnic 野餐
We could go on a picnic today.

rabbit 兔子
Rabbits run fast.

value 价值
valuable 有价值的
His work has no value.
Is the watch valuable?

pink 粉红色
She is wearing a pink dress.

wolf 狼
Then the wolf ran away through the trees.

labor 体力
laboratory 实验室
Many women do labor work.
The equipment of the laboratory is excellent.

land 地
In 1969, the first men landed on the Moon.

ali 阿里
alien 外星人
They are alien.

suit 西装
fit 适合
This job suits me well.
I bought myself a new suit.

mystery 谜
mysterious 神秘的
It's a mystery to me.
He was very mysterious in his manner.

temple 寺庙
There's a temple on the hill.
He has grey hair at the temples.

medicine 药
medical 医药的
Have you been taking your medicine?
He is a medical student.

purpose 目的
What is the purpose of your visit?

prevent 阻止
prevent...from ...
We have to prevent them from smoking.

energy 力量
energetic 有精力的
I am full of energy now.
You should exercise more to keep energetic.

bury 埋葬
burial 埋葬
We will bury this bird.
Will you give him a Christian burial?

honor 荣幸
It's my great honor to do
It is an honor to have you here, sir.

victory 胜利
They won a victory in the battle.

ancestor 祖先
My ancestors were Chinese.

enemy 敌人
He defeated the enemy in the battle.

period 时期
There were many important events in this period.
I am in my period.

lyrics 歌词
He wrote some great music, but the lyrics weren't that good.

electricity 电
electronic 电子的
The price of electronic products dropped recently.

smooth 平滑的
rough 粗糙
Her skin is very smooth.

spare 空闲的
What do you do in your spare time?
a spare key
Im afraid I haven't got any spare cash.
I'd love to have a break, but I can't spare the time just now.
spare no effort to do

case 盒子
in that case 那样的情况下
In that case, nobody could save him.
```

---

## 📄 文件: 初中\27.md

---

```md
war 战争
battle 战争
How many people died in the war?

stick 棍棒
chopstick 筷子
stick to 坚持做某事
sticker 帖子
Stick the poster on the wall.
He sticks to writing.
Children get stickers for good work.

down 悲伤
I felt down.

end 结束
ending 结尾
There is a shop at the end of the street.
Every story has an ending.

drama 剧
drama queen 作秀女王
Most young people don't like dramas.
I don't like drama queens.

plenty 大量
plenty of
You have plenty of time to read.

shut 关闭
shut up 闭嘴
shut off 关闭
She lay down on her bed and shut her eyes.
Please shut up your mouth.
Shut off the engine.

intelligent 聪明
She is intelligent and hard-working.

sense 感觉
sense of smell
I had the sense that he was lying.

moving 感动的
It is such a moving film that we are all moved by it.

perform 表演
performance 表演
The children perform two plays each school year.
This evening's performance will begin at 8:00 pm.
the country's economic performance
A high-performance car

pity 遗憾
It's a pity that he can't come.

total 总数
in total 总共
Her total income was 10000 a year.

master 掌握
I need to master English.

praise 表扬
Jane was praised by her teacher.

wound 伤口
It took several months for his wounds to heal.

cap 帽子
capital 首都
He placed his cap on a chair.
Beijing is the capital of the China.

effort 努力
make an effort to do
Please make an effort to do your homework

custom 风俗
It's a custom for the bride's father to pay for the wedding.

customer 顾客
consumer 消费者
consume 消费
She's one of our regular customers.
A smaller vehicle will consume less fuel.

chalk 粉笔
A box of colored chalks.

knock 敲击
Please knock at the door before entering.

worth 值...
The old phone is worth 200,000 RMB.
The film is well worth seeing.

manner 举止
He is a man with good manners.

empty 空的
A empty box.

basic 基本的
base 基地
basin 盆地
The basic idea is simple.

behave 举止
behavior 举止
You have to behave.
Your behavior is not polite.

gradual 逐渐的
gradually 逐渐地
Education is a gradual process.
Gradually, I started to understand him.

rather 相当
would rather 宁愿
would rather do ... than do
rather than 而不是
He is rather tall.
I would rather have noodles than rice.
I love him rather than you.

coach 教练
He is our football coach.
a coach station

kick 踢
Please stop talking, or I'll kick you out.

besides 除...之外
Besides English, he has to study German.
Besides, the cap suits you very well.
```

---

## 📄 文件: 初中\28.md

---

```md
courage 勇气
courageous 有勇气的
encourage 鼓励
It takes courage to do that.
a very courageous decision.
You should encourage them to do better.

pull 拉
He pulled the donkey hard.

nod 点头
shake 摇头
She nodded to us.

fault 错误
It's my fault to shout at you.

block 块
a block of stone
Let's walk round the block.
The sink is blocked.

stare 盯着看
What are you staring at？

burn 燃烧
burning 着火的
Fires were burning all over the city.

live 生活
alive 活着的
My grandparents are still alive.

cream 奶油
ice cream 冰淇淋
Can I have an ice cream?

pie 馅饼
Would you like another piece of apple pie?

bean 豆
Cook the beans with pork.

market 市场
I usually buy vegetables at the market.

fool 蠢人
You are such a big fool.

costume 服装
costume party 化妆舞会
We look forward to the coming costume party.

announce 宣告
announcement 宣告
The government has announced plans to create 10,000 new jobs.

spaghetti 意大利面
I prefer Chinese noodles to spaghetti.

hoax 恶作剧
It is just a hoax.

cancel 取消
He was forced to cancel his visit.

little 小的
litter 垃圾
rubbish 垃圾
I hate people who litter the forest.

dustbin 垃圾箱
dust 灰尘
bin 箱子
We should throw the rubbish into the dustbin.
The desk is full of dust.
a bread bin

can 易拉罐
trash can 垃圾箱
a can cola
We should throw the rubbish into the trash can.

bottom 底部
the bottom of a well

coal 煤
Shanxi province is famous for coal.

advantage 优势
disadvantage 劣势
His appearance is a big advantage.

cost 花费
How much does it cost?
It costs me 2000 yuan.

wood 木头
wooden 木制的
The table is made of wood.
This is a wooden table.

plastic 塑料的
Most plastic bottles could be reused.

shark 鲨鱼
They drove the shark away.

fin 鱼鳍
Look at the fin. What kind of fish is it?

cruel 残酷的
cruelty 
He is cruel to animals.

chain 链
the food chain 食物链
People stand on the top of the food chain.

map 地图
napkin 餐巾
Wear the napkin before meal.

bottle 瓶子
A bottle of milk.
```

---

## 📄 文件: 初中\29-01.md

---

```md
iron 铁
The iron and steel industry.

work 作品
This is my work.

medal 奖牌
They won the goal medal.

survey 调查
A survey of water usage.
We surveyed the damage caused by the fire.

standard 标准
What's your standard of beauty?

row 排
in a row 连续地
a row of houses
The children were asked to stand in a row.
I have been working for 12 weeks in a row.

method 方法
Have you tried the new method?

double 两倍
A large double bed.

care 关心
caring 关系人的
Why do I care what they think?
He is a caring friend.

junior 年少的
senior 年长的
junior high school 初中
senior high school 高中
the junior football club
Seniors can get a 10% discount.

text 文本
textbook 课本
Text to me when you get home.
a biology text book.

level 水平
Your English level is higher than mine.

degree 度数
His body temperature goes up to forty degrees.
He got a degree in Economics.

ceremony 仪式
The wedding ceremony is great.

lately 最近
Have you seen him lately?

task 任务
I'm glad that you have finished the task.

ahead 在前面
ahead of 在..前面
He is ahead of his classmates.

separate 分开
separate A from B
They go to separate ways.
```

---

## 📄 文件: 初中\29-02.md

---

```md
pound 磅
The grapes cost 2 dollars a pound.

admire 羡慕
I really admire her beauty.

fascinate 深深吸引
fascinating 迷人的
The city fascinate him.
That sounds absolutely fascinating.

mall 购物中心
Let's meet at the mall and go to see a movie.

dare 敢
Try it if you dare.

fail 失败
He failed maths but others passed.

balloon 气球
She popped a balloon with her fork.

spoon 汤匙
scoop 汤勺
She feeds the baby with a spoon.
I'd like two scoops of ice cream.

saint 圣人
After having two kids, she has the patience of a saint.

sour 酸的
Lemon is too sour to eat.
The milk went sour.

pierce 扎破
A nail pierced the tire of our car.

circle 圆圈
Can you draw a circle like this?
Circle the correct answer.

Britain 大不列颠
British 不列颠的
In the World War II， Britain fought against Germany.
We knew nothing about British.

mad 生气的
You make me so mad!

coast 海岸
coastal 沿海的
We drove along the Pacific coast to Seattle.
They reached a coastal city two hours ago.
```

---

## 📄 文件: 初中\30.md

---

```md
lifelong 终生的
She became a lifelong friend of mine.

overnight 一夜之间
He became a boss overnight.

textbook 课本
Pass me your English textbook.

mooncake 月饼
Would you like a mooncake?

restroom 洗手间
washroom 洗手间
bathroom 浴室
You can go to the restroom nearby.
Sorry, I had to go the washroom.
Our bathroom is not very big.

bookstore 书店
The bookstore is just around the corner.

keyboard 键盘
This is an amazing keyboard.

gentleman 先生
Ladies and gentlemen, welcome to the party.

industry 行业
This could be bad for US industry.

postcard 明信片
Don't forget to send us a postcard.

postman 邮递员
deliveryman 快递员
One of my friends became a postman recently.

underground 低下的
The car park is underground.

background 背景
Do you know anything about his background?

interview 采访
The interview lasted about an hour.

chopstick 筷子
Can you eat noodles with chopsticks?

handbag 手提包
I prefer the black handbag.

part-time 兼职的
full-time 全职的
I want to look for a part-time job.
I've decided to stay at home and be a full-time mother.

policeman 警察
fireman 消防员
What happened to that policeman?
Why could you like to be a fireman?

outdoors 在户外
indoors 在室内
Go outdoors and have a rest.
Mr. White stayed indoors for a whole afternoon.

midsummer 仲夏
mid-autumn 中秋
We enjoyed a perfect midsummer afternoon.
When is mid-autumn festival.

superhero 超级英雄
I dream of becoming a superhero.

lifetime 一生
Marriage is a lifetime promise.

teammate 队友
classmate 同学
roommate 室友
soulmate 知己
If I were his teammate, I wouldn't do that.
She is my classmate.
My roommate knows we well.
She's my soulmate.

passport 护照
Let me see your passport, please.

backpack 背包
backpacker 背包客
I lost my backpack.
He's a full-time backpacker.

oversleep 睡过头
Never oversleep again!

overcome 克服
So how can we overcome this?

workday 工作日
Today is my workday.

fisherman 渔民
The young fisherman laughed.

takeaway 外卖食物
Let's have a takeaway tonight.

ecosystem 生态系统
What about the ecosystem of a city?
```