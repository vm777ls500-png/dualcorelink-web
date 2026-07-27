# SEO Authority Phase 1D — ContactPoint Entity Schema Audit

Date: 2026-07-27

## 1. 审计目标

本阶段只读审计现有 `Organization.contactPoint` 的来源、输出范围、可见联系方式一致性和后续映射选择。除本报告外，不修改生产代码、Organization Schema、telephone、sameAs、地址、Logo、Phase 3A 页面、sitemap、robots 或 `llms.txt`，也不 commit、push 或 deploy。

审计开始基线：

- Branch: `main`
- HEAD: `2fc7e5af567ec576993992ecc5a4a193bdc63d3b`
- Upstream: `main...origin/main`
- 初始工作区：clean
- 最近三条提交：
  - `2fc7e5a docs: finalize seo authority phase 1c report`
  - `57d313f seo: align brand and purchasing facts`
  - `69a8fa8 docs: finalize seo growth phase 3a report`
- Phase 1C 实施提交 `57d313fcb331f7cb9f81a375a8346cfdb86eaeef` 及文档封存提交 `2fc7e5af567ec576993992ecc5a4a193bdc63d3b` 均已在当前历史中。

## 2. 当前 Schema 状态

### 2.1 来源链路

| Schema 字段 | 来源文件 | 当前值 | 页面影响 |
|---|---|---|---|
| `Organization.contactPoint` | `src/lib/schema/entities.ts` | 单个 `ContactPoint` 对象 | 通过 `createSchemaGraph()` 进入共享图 |
| `contactPoint.@type` | `src/lib/schema/entities.ts` | `ContactPoint` | 同上 |
| `contactPoint.telephone` | `src/lib/schema/entities.ts` + `src/config/brand.ts` | `+${brand.whatsapp.international}` → `+85270390436` | 74 个 sitemap 页面 |
| `contactPoint.email` | `src/lib/schema/entities.ts` + `src/config/brand.ts` | `sales@dualcorelink.com` | 74 个 sitemap 页面 |
| `contactPoint.contactType` | `src/lib/schema/entities.ts` | `sales` | 74 个 sitemap 页面 |
| 全局实体注入 | `src/lib/schema/builders.ts` | `createGlobalEntities()` 合并到每个 `createSchemaGraph()` | 所有调用该 builder 的页面 |
| JSON-LD 输出 | `src/components/seo/json-ld.tsx` | `application/ld+json` | 各页面显式渲染 `<JsonLd>` 时输出 |

`ContactPoint` 不是在全局 layout 中无条件输出，而是由页面显式调用 `createSchemaGraph()` 时共享注入。因此它是“共享实体定义”，但不是“每个页面都一定输出”。

### 2.2 静态与生产输出

本地 `out/`：

- HTML 文件：80
- sitemap URLs：76
- ContactPoint 节点：74
- 含 ContactPoint 的 HTML：74
- 唯一 ContactPoint 值：1
- `/en/contact/`：0 个 JSON-LD script，0 个 ContactPoint
- `/en/downloads/`：0 个 ContactPoint
- 额外的非 sitemap `/en/regions/` 静态页：0 个 ContactPoint

生产 sitemap 只读核验：

- 76/76 URL 返回 HTTP 200
- 74/76 URL 各含 1 个 ContactPoint
- ContactPoint 总数：74
- 唯一 ContactPoint 值：1
- 无 ContactPoint：`https://dualcorelink.com/en/contact/`、`https://dualcorelink.com/en/downloads/`
- localhost 泄漏：0

当前唯一节点：

```json
{
  "@type": "ContactPoint",
  "telephone": "+85270390436",
  "email": "sales@dualcorelink.com",
  "contactType": "sales"
}
```

### 2.3 包含 ContactPoint 的页面

| 页面组 | 数量 | 范围 |
|---|---:|---|
| Home | 1 | `/en/` |
| About | 1 | `/en/about/` |
| Products | 37 | `/en/products/` + 36 个产品详情页 |
| Product Series | 1 | `/en/product-series/` |
| Solutions | 7 | `/en/solutions/` + 6 个方案详情页 |
| Application Scenarios | 1 | `/en/application-scenarios/` |
| FAQs | 1 | `/en/faqs/` |
| Case Studies | 4 | 列表页 + 3 个详情页 |
| Resources | 16 | `/en/resources/` + 15 个 Resource 详情页 |
| Regions | 5 | Middle East、Saudi Arabia、UAE、Southeast Asia、Vietnam 详情页 |
| 合计 | 74 | 74 个生产 sitemap 页面 |

Google 当前建议把 Organization 信息放在首页或一个描述组织的单独页面，不需要每页重复。本项目的 74 页共享输出是现有架构事实；调整输出覆盖范围属于 Organization Schema 架构变更，不在本阶段范围内。

## 3. 联系方式事实矩阵

| 类型 | 当前值 | 来源 | 是否公开可验证 | 状态 |
|---|---|---|---|---|
| WhatsApp | `+852 7039 0436`；机器值 `85270390436` | `src/config/brand.ts`、Contact 页面、Footer、各 WhatsApp CTA、生产 `wa.me` 链接 | 是：官方生产站明确标为 WhatsApp；未独立验证账户所有权或可用性 | 可见语义明确；不应仅凭现状推定为语音电话 |
| Phone | `+86 13703333750`；机器值 `+8613703333750` | `src/app/[locale]/contact/page.tsx`、`src/components/layout/footer.tsx`、生产 `tel:` 链接 | 是：官方生产站明确标为 Phone；未实际拨打或独立验证所有权/接听用途 | 当前最符合 `telephone` 的候选，实施前仍需业务确认 |
| Sales email | `sales@dualcorelink.com` | `src/config/brand.ts`、Contact、Footer、Inquiry fallback、当前 ContactPoint | 是：官方生产站公开 `mailto:` | 与 `contactType: sales` 一致 |
| General email | `hello@dualcorelink.com` | `src/config/brand.ts`、Contact、Footer | 是：官方生产站公开 `mailto:` | General contact |
| Support email | `support@dualcorelink.com` | `src/config/brand.ts`、Contact | 是：官方生产站公开 `mailto:` | Technical support；未与公开电话绑定 |
| WeChat | `a13703333750` | Contact 页面、Footer、Contact QR 图片 | 是：官方生产站公开 ID 和二维码；未独立验证账户 | 可见渠道，无当前 Schema 映射 |

“公开可验证”在本报告中仅表示可从官方生产网站的可见文本与链接复核，不等于号码所有权、语音接听能力、WhatsApp 账户状态或业务值守已由独立证据确认。

## 4. 冲突点与 Contact 页面一致性

### 4.1 可见渠道核验

| 位置 | Phone | WhatsApp | Email | WeChat | Schema |
|---|---|---|---|---|---|
| `/en/contact/` | `Phone: +86 13703333750`，`tel:+8613703333750` | `WhatsApp: +852 7039 0436`，`wa.me/85270390436` | sales、general、support | `a13703333750` + QR | 无 JSON-LD |
| Header | 无号码 | 无直接 WhatsApp | 无 | 无 | 页面自身决定是否输出 |
| Footer | `Phone: +86 13703333750`，`tel:` | `WhatsApp: +852 7039 0436`，`wa.me` | general、sales | `a13703333750` | 不在 Footer 内输出 |
| Bottom CTA | 无 Phone | WhatsApp 按钮 | 通过 inquiry/form 路径 | 无 | 不独立输出 |
| Inquiry 页面/表单 | 用户填写字段标为 `WhatsApp / Phone`；不是组织号码 | WhatsApp fallback | sales email fallback | 无 | 不独立输出 |
| WhatsApp buttons | 无 Phone | 统一由 `brand.whatsapp` 生成 `wa.me/85270390436` | 无 | 无 | 不独立输出 |

### 4.2 冲突列表

1. **事实语义冲突**：Schema 的 `telephone` 使用 `+85270390436`，而全部可见站内证据把该号码只标为 WhatsApp。
2. **遗漏真实 Phone 候选**：可见页面把 `+8613703333750` 标为 Phone 并提供 `tel:`，但当前 ContactPoint 不使用该号码。
3. **Contact 页面覆盖缺口**：包含最完整联系方式的 `/en/contact/` 恰好不输出 Organization/ContactPoint；ContactPoint 分布在其他 74 页。修复覆盖范围会改变 Organization Schema 架构，本阶段不实施。
4. **配置漂移风险**：Phone 与 WeChat 分别在 Contact 页面和 Footer 中重复硬编码；WhatsApp 与 emails 则集中在 `brand.ts`。当前值一致，但未来可能漂移。
5. **用途证据不足**：`+86` 号码可确认被站点称为 Phone，但页面未明确称它为 customer support、sales hotline 或其他专用部门号码。
6. **无 Email 冲突**：当前 ContactPoint 的 sales email 与 `contactType: sales`、Contact 的 “Sales & quotations” 描述一致。

## 5. Google / Schema.org 映射评估

官方依据：

- Schema.org 将 `telephone` 定义为 telephone number，并允许用于 `ContactPoint`；`contactType` 是 Text，用于区分 sales、PR 等用途。
- Schema.org 允许 `Organization.contactPoint` 使用 `ContactPoint`，其示例也允许多个 ContactPoint。
- Google Organization 文档把 `contactPoint.telephone` 定义为可联系企业的电话号码，要求包含国家与区号；`contactPoint.email` 是明确支持的联系方式。
- Google 建议结构化数据真实代表页面可见内容，不应不相关或误导。

参考：

- https://schema.org/ContactPoint
- https://schema.org/contactPoint
- https://schema.org/telephone
- https://schema.org/contactType
- https://developers.google.com/search/docs/appearance/structured-data/organization
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies

| 方案 | Schema.org | 与可见内容一致性 | 是否需确认 | Product/Article 影响 | Phase 3A 影响 | 结论 |
|---|---|---|---|---|---|---|
| A：`telephone=+86`，`contactType=customer support` | 结构有效 | Phone 值一致，但站点未把该号码称为 customer support | 是，需确认号码用途和值守部门 | 不改变页面专属 Product/Article 节点；改变共享 Organization 节点 | 8 页的共享 JSON-LD 都会改变 | 不建议，除非业务确认它确为 customer support |
| B：`telephone=+86`，`contactType=sales` | 结构有效；sales 是合理文本用途 | Phone 值与可见 Phone 一致；sales 与同节点 email、询盘语境一致，但 Phone 未显式标为 sales | 是，需确认它是官方、可接听且用于销售/项目询盘 | 不改变 Product/Article 结构；只改变共享 Organization 内的值 | 8 页共享节点改变，可见内容不变 | **条件式推荐** |
| C：`telephone=WhatsApp` | 只有在该号码确为可联系企业的 telephone 时才事实成立 | 当前页面只标为 WhatsApp，只提供 `wa.me`，无语音电话证据 | 是，且需确认语音接听能力 | 同上 | 同上 | 不建议维持 |
| D：多个 ContactPoint（Phone + WhatsApp） | 多个 ContactPoint 在 Schema.org 中允许 | Phone 节点可对齐；但没有专用、经 Google Organization 文档明确支持的 WhatsApp 属性。若仍把 WhatsApp 写入 `telephone`，冲突未解决 | 是，需确认两个渠道及具体表示法 | 共享图增加节点；Product/Article 专属字段不变 | 8 页共享节点增加 | 当前不建议 |

补充：`ContactPoint` 从 `Thing` 继承 `url`，理论上可引用渠道 URL；但 Google Organization 文档明确列出的 ContactPoint 子属性是 `telephone` 与 `email`，未给出 WhatsApp 专用映射。不能据此自行发明 WhatsApp 字段，也不应把 `wa.me` 放入 `sameAs`。当前最稳妥做法是继续把 WhatsApp 作为可见 `wa.me` 渠道，不在 `telephone` 中冒充语音电话。

## 6. 推荐方案与不建议方案

### 推荐方案

在业务确认后采用方案 B：

```json
{
  "@type": "ContactPoint",
  "telephone": "+8613703333750",
  "email": "sales@dualcorelink.com",
  "contactType": "sales"
}
```

推荐理由：

1. `+86` 是当前官网唯一明确标为 Phone 且带 `tel:` 的号码。
2. `sales@dualcorelink.com` 已与 `contactType: sales` 一致。
3. 网站的主要联系方式语境是 B2B 项目询盘、报价、采购、OEM/ODM 和集成。
4. 不需要新增 second ContactPoint、sameAs、地址、Logo 或自定义 WhatsApp 字段。
5. 不改变 Product、Article 或 Breadcrumb 节点的结构。

### 不建议方案

- 不建议继续把仅标为 WhatsApp 的 `+85270390436` 放入 `telephone`。
- 不建议在无业务证据时把 `+86` 定义为 `customer support`。
- 不建议为增加节点数量而创建第二个 WhatsApp ContactPoint。
- 不建议使用未定义的 `whatsapp` 属性，或把 `wa.me` 作为 `sameAs`。
- 不建议在本次 ContactPoint 修正中顺带调整 Organization 输出范围、地址、Logo、sameAs 或页面内容。

## 7. 是否需要用户/业务确认

**需要，且在确认前不建议进入实施。**

最低确认项：

1. `+86 13703333750` 是否由 DUALCORE LINK / 相关业务主体正式控制。
2. 该号码是否可接听常规语音电话，而不仅是 WeChat 关联号码。
3. 该号码是否用于 B2B sales / quotation / project inquiry，而非私人、售后或其他用途。
4. `+852 7039 0436` 是否仅用于 WhatsApp，还是也可作为对外语音电话。
5. 是否授权在当前 74 个生产页面的共享 Organization JSON-LD 中替换该值。

若不能确认第 1–3 项，安全回退不是方案 C，而是暂时移除 ContactPoint 的 `telephone`，保留公开且一致的 sales email。该回退也属于后续独立实施决策，本阶段不修改。

## 8. 实施风险

| 等级 | 风险 | 说明 |
|---|---|---|
| LOW | 单字段代码改动复杂度 | 实际值来自共享 entity builder，修改点少；但低复杂度不代表低业务风险 |
| MEDIUM | 全站输出面 | 当前会改变 74 个 sitemap 页面的 Organization JSON-LD，包括全部 8 个 Phase 3A 页面；不会改变它们的可见内容或专属 Product/Article Schema |
| MEDIUM | 测试基线 | `tests/seo-authority-phase-1c.test.ts` 当前明确断言旧值 `+85270390436`，实施必须同步更新该边界测试并新增 ContactPoint 语义测试 |
| MEDIUM | Google 重新处理 | 值变化后搜索引擎需要重新抓取和处理；不能保证展示、时间或结果，也不能把它描述为排名提升 |
| HIGH | 未确认的号码所有权/用途 | 在业务确认前写入 sales telephone 可能制造新的实体事实错误 |
| HIGH | WhatsApp 自定义/重复映射 | 不受官方映射明确支持的表示可能让 JSON-LD 看似丰富但事实或语义不可靠 |

Search Console 风险应准确表述：更改会改变 Google 可读取的 Organization 数据，后续应使用 Rich Results Test 和 URL Inspection 复核；没有证据表明它必然触发某个专用 Search Console 验证流程，也不能保证知识面板或搜索展示变化。

## 9. 后续实施测试计划

仅在业务确认并单独授权实施后执行：

1. 添加/更新 focused test，断言 `telephone=+8613703333750`、`email=sales@dualcorelink.com`、`contactType=sales`。
2. 断言 `+85270390436` 不再出现在任何 `telephone` 字段，但 `wa.me/85270390436` 可见链接保持不变。
3. 运行 `npm.cmd run lint`、`npm.cmd run test:data`、`npm.cmd run media:audit`、`npm.cmd run build`、`git diff --check`。
4. 解析全部静态 HTML，确认 ContactPoint 数量与覆盖范围按批准方案保持；确认唯一值正确。
5. 确认 sitemap 仍为 76 URLs，robots、canonical、hreflang、`llms.txt` 状态不变。
6. 验证 36/36 Product Schema、15/15 Article Schema、BreadcrumbList 均未改变或丢失。
7. 对 8 个 Phase 3A 页面逐页确认可见内容、page-specific schema、canonical、H1 与 CTA 不变，仅共享 Organization 值变化。
8. 对 Contact、Footer、Header、Inquiry 和 WhatsApp CTA 复核 `tel:`、`wa.me`、emails 与标签。
9. 用 Schema.org Validator / Google Rich Results Test 验证代表页面。
10. 部署后仅在另行授权时检查生产 76 URLs，并用 URL Inspection 抽查 Home、About、Product、Resource、Region；不声称 Google 已重新抓取。

## 10. 回滚计划

若未来获批实施后发现号码事实错误、Schema 校验异常或生产回归：

1. 仅回退 ContactPoint telephone 改动及对应 focused test，不使用 `git reset --hard`。
2. 恢复到实施前已验证的 entity 值或按业务决定删除未确认的 telephone；不顺带修改其他 Organization 字段。
3. 重新运行完整验证和静态 JSON-LD 计数。
4. 使用部署平台的前一已知良好原子版本或新的精确回退 commit 恢复生产。
5. 复核 76 URLs、74 个现有 ContactPoint 覆盖页、8 个 Phase 3A 页面及 36/36 Product、15/15 Article Schema。
6. 记录回滚 SHA、生产验证时间和实际恢复值。

## 11. 审计结论

- 当前 ContactPoint 来源：`src/lib/schema/entities.ts`，值间接依赖 `src/config/brand.ts`。
- 当前 `telephone`：`+85270390436`，但官网只把它呈现为 WhatsApp。
- 当前可见 Phone：`+8613703333750`。
- 电话真实性结论：`+86` 是站内公开、带 `tel:` 的 Phone 候选；号码所有权、语音可用性和 sales 用途仍缺少独立/业务确认。
- 推荐：业务确认后采用方案 B；WhatsApp 保持为可见 `wa.me` 渠道。
- 当前是否进入实施：否；先完成上述业务确认，再启动独立实施阶段。
- 本阶段生产修改：无。
- 本阶段唯一新增文件：本报告。

本报告不声称排名、曝光、点击、Google 重新抓取、知识面板变化或 AI/GEO 引用提升。

## 12. 本阶段执行验证

- 全仓库关键词定位：完成。
- 本地静态 HTML：80 个文件已解析；ContactPoint 74 个，唯一值 1。
- 生产 sitemap：76 URLs；76/76 HTTP 200；ContactPoint 74 个，唯一值 1。
- 生产 Contact 页面：HTTP 200；Phone、WhatsApp、3 个 email、WeChat、`tel:` 和 `wa.me` 均已核对。
- 无 WordPress 依赖的 Phase 1C/Schema 边界测试：4/4 passed。
- `npm.cmd run test:data` 额外尝试：94/99 passed；5 项均因本机 WordPress `127.0.0.1:8080` 未运行而出现 `ECONNREFUSED`，不是 ContactPoint 断言失败。本审计未启动或修改外部服务。
- tracked production-code diff：空。
- `git diff --check`：passed。
- 新报告的 whitespace check：passed；仅有 Windows 后续可能将 LF 转为 CRLF 的提示。
- `llms.txt`：仓库根、`public/` 和 `out/` 均不存在。
- commit / push / deploy：均未执行。
