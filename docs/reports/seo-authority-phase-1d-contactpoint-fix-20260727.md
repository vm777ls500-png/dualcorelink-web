# SEO Authority Phase 1D-B — ContactPoint Schema Safe Fix

Date: 2026-07-27

## 1. 业务确认记录

本次实施依据以下已完成的业务确认：

- `+86 13703333750` 当前可拨打。
- 接听人员为项目负责人。
- 用于销售咨询。
- 允许公开作为公司联系电话。
- 预期长期有效。

该确认授权把 `+8613703333750` 用作 `Organization.contactPoint.telephone`。`+852 7039 0436` 继续仅作为 WhatsApp 联系方式。

## 2. 修改原因

修改前的 ContactPoint 把官网明确标为 WhatsApp、通过 `wa.me` 使用的 `+85270390436` 写入 `telephone`。官网同时把 `+86 13703333750` 明确标为 Phone，并提供 `tel:+8613703333750`。

本次修复把 Schema telephone 改为已确认可拨打、用于销售咨询且允许公开的 `+86` 电话，使共享 Organization JSON-LD 与公开可见联系方式一致。

## 3. 修改文件

本任务修改或新增：

1. `src/config/brand.ts`
   - 新增已确认的公开 Phone 配置。
2. `src/lib/schema/entities.ts`
   - ContactPoint telephone 从 WhatsApp 配置切换到 Phone 配置。
3. `tests/seo-authority-phase-1c.test.ts`
   - 移除已过时的旧 WhatsApp telephone 值冻结；继续保护 ContactPoint 类型、sales email、contactType，以及未授权的 logo、sameAs、address 边界。
4. `tests/seo-authority-phase-1d.test.ts`
   - 新增 Phase 1D 的 5 项精确回归测试。
5. `docs/reports/seo-authority-phase-1d-contactpoint-fix-20260727.md`
   - 本验收报告。

任务开始前已存在未提交文件：

- `docs/reports/seo-authority-phase-1d-contactpoint-audit-20260727.md`

该审计报告不是本任务产生，Phase 1D-B 未修改、删除或覆盖它。

## 4. 修改前 Schema

```json
{
  "@type": "ContactPoint",
  "telephone": "+85270390436",
  "email": "sales@dualcorelink.com",
  "contactType": "sales"
}
```

## 5. 修改后 Schema

```json
{
  "@type": "ContactPoint",
  "telephone": "+8613703333750",
  "email": "sales@dualcorelink.com",
  "contactType": "sales"
}
```

未改变：

- Organization `@id`: `https://dualcorelink.com/#organization`
- ContactPoint `@type`
- sales email
- `contactType: sales`
- Brand 和 WebSite 稳定实体 ID

没有创建重复 Organization。

## 6. WhatsApp 保留方式

WhatsApp 配置保持：

```text
display: +852 7039 0436
international: 85270390436
URL: https://wa.me/85270390436
```

验证结果：

- Contact 页面仍显示 `+852 7039 0436`。
- Contact 页面仍包含 `wa.me/85270390436`。
- `WhatsAppButton` 仍由 `createWhatsAppUrl()` 生成链接。
- Footer 和所有 76 个 sitemap 页面的静态 HTML 仍包含 `wa.me/85270390436`。
- `+85270390436` 作为 telephone 的节点数量从 74 降为 0。

未修改任何 WhatsApp CTA、按钮、消息或页面内容。

## 7. 全站影响范围

| 项目 | 修改前 | 修改后 |
|---|---:|---:|
| Sitemap URLs | 76 | 76 |
| ContactPoint 节点 | 74 | 74 |
| 含 ContactPoint 页面 | 74 | 74 |
| 唯一 ContactPoint 值 | 1 | 1 |
| `telephone=+85270390436` | 74 | 0 |
| `telephone=+8613703333750` | 0 | 74 |
| 重复 Organization 页面 | 0 | 0 |
| Product Schema | 36 | 36 |
| Article Schema | 15 | 15 |

仍不输出 ContactPoint 的两个 sitemap 页面：

- `https://dualcorelink.com/en/contact/`
- `https://dualcorelink.com/en/downloads/`

本次没有改变既有 Schema 输出覆盖逻辑，只替换共享 ContactPoint 的 telephone 来源。

## 8. Phase 3A 回归

以下 8 个 Phase 3A 页面全部存在于新静态输出：

- `/en/resources/hotel-rcu-buying-guide/`
- `/en/resources/smart-hotel-room-control-system-guide/`
- `/en/resources/hotel-guest-room-control-interfaces-guide/`
- `/en/regions/saudi-arabia/`
- `/en/regions/uae/`
- `/en/products/hotel-smart-room-rcu-host-1/`
- `/en/products/86-type-ai-smart-control-display/`
- `/en/products/smart-four-key-scene-control-panel/`

回归结果：

- 8/8 页面保留原 page-specific Product、Article 或 CreativeWork Schema。
- 8/8 页面保留 WhatsApp 链接。
- 8/8 页面只发生共享 Organization ContactPoint telephone 的事实修正。
- `src/config/resources.ts`：无 diff。
- `src/config/region-landing-pages.ts`：无 diff。
- `src/config/product-conversion.ts`：无 diff。
- Phase 3A 可见内容、标题、URL、内链、CTA 和页面配置均未改变。

## 9. 测试结果

### Focused tests

Command:

```text
npx.cmd tsx --test tests/seo-authority-phase-1d.test.ts tests/seo-authority-phase-1c.test.ts tests/seo-phase-3a.test.ts
```

Result: 13/13 passed。

其中：

- Phase 1D：5/5 passed
- Phase 1C：4/4 passed
- Phase 3A：4/4 passed

### Full validation

| 检查 | 结果 |
|---|---|
| `npm.cmd run lint` | Passed |
| 首次 `npm.cmd run test:data`（未设置 CMS root） | 99/104 passed；5 项因 `127.0.0.1:8080` 未运行而 `ECONNREFUSED` |
| `WORDPRESS_REST_ROOT=https://cms.dualcorelink.com/wp-json npm.cmd run test:data` | 104/104 passed |
| `npm.cmd run media:audit` | 0 errors，1 条既有 warning |
| 首次 `npm.cmd run build`（未设置 CMS root） | 编译和类型检查通过；收集产品数据时因本地 WordPress 未运行而停止 |
| `WORDPRESS_REST_ROOT=https://cms.dualcorelink.com/wp-json npm.cmd run build` | Passed，156/156 pages |
| `export:clean` | 8/8 sentinel directories checked |
| `git diff --check` | Passed |

公开 CMS REST root 只作为命令级临时环境变量使用，没有写入仓库、部署配置或生产环境。

### 静态输出

- Sitemap：76 URLs
- ContactPoint：74 个，唯一值为修正后的 `+8613703333750`
- 旧 WhatsApp telephone：0 个
- WhatsApp `wa.me/85270390436`：76/76 页面保留
- Product：36
- Article：15
- 重复 Organization：0
- localhost / `127.0.0.1` 泄漏：0
- `llms.txt`：不存在

## 10. 未修改项目

本次未修改：

- Phase 3A 页面或配置
- Products、Resources、Regions 页面内容
- Contact 页面、Header、Footer、Inquiry 或 WhatsApp CTA
- canonical、hreflang、robots、sitemap
- Organization ID 或其他 Organization 字段
- Product、Article、Breadcrumb 或其他 Schema builder
- sameAs、地址、Logo、Article author
- dependencies、package files、Next.js 配置
- `llms.txt`

实施已在后续人工批准阶段完成 commit、push 和 AWS production deploy；详情见第 12–18 节。

## 11. 风险说明

- 业务确认已解决 telephone 所有权、可拨打性、公开性和 sales 用途的主要事实风险。
- 该字段属于共享实体，未来部署后会同时改变 74 页 JSON-LD；这是预期影响。
- 搜索引擎何时重新抓取、如何处理或是否改变搜索展示均不可保证。
- Phone 值仍同时存在于品牌配置、Contact 页面和 Footer 常量中；本次测试验证三处一致，但未扩大范围重构页面。
- 前一阶段审计报告仍是独立的未提交文件，人工审核时应决定是否与本修复报告分别处理。

## 12. 实施 commit 与 push

- Implementation commit: `8511d7b3a7438c459755fc060f932913cb915279`
- Commit message: `seo: correct contactpoint schema phone mapping`
- Commit scope: 6 个批准文件，611 insertions，8 deletions
- Push: successful
- Remote result: `2fc7e5a..8511d7b main -> main`
- Force push / rebase / reset: none

实施 commit 包含：

- `src/config/brand.ts`
- `src/lib/schema/entities.ts`
- `tests/seo-authority-phase-1c.test.ts`
- `tests/seo-authority-phase-1d.test.ts`
- `docs/reports/seo-authority-phase-1d-contactpoint-audit-20260727.md`
- `docs/reports/seo-authority-phase-1d-contactpoint-fix-20260727.md`

## 13. AWS production deployment

| Field | Result |
|---|---|
| Workflow | `AWS static production deploy` |
| Run ID | `30259390311` |
| Run URL | `https://github.com/vm777ls500-png/dualcorelink-web/actions/runs/30259390311` |
| Job ID | `89955457436` |
| Runner | `dualcorelink-production` self-hosted Linux x64 |
| Source SHA | `8511d7b3a7438c459755fc060f932913cb915279` |
| Deployment URL | `https://aws.dualcorelink.com/en/` |
| Official URL | `https://dualcorelink.com/` |
| Previous release | `/srv/dualcorelink/frontend/releases/57d313fcb331-20260727-140744` |
| Current release | `/srv/dualcorelink/frontend/releases/8511d7b3a743-20260727-184905` |
| Status | Success |

全部 workflow steps 成功：

1. exact-SHA checkout
2. validated build environment
3. dependency installation
4. lint
5. data validation
6. inquiry infrastructure validation
7. media audit
8. 156/156 static build
9. atomic release activation
10. AWS health checks
11. test-domain indexing protection

Runner 使用已验证的公开 CMS REST root `https://cms.dualcorelink.com/wp-json`，没有 localhost fallback。Nginx 配置测试、local HTTPS health check 和 external HTTPS health check 均在第一次尝试通过。

## 14. Production ContactPoint verification

生产 76 个 sitemap URL 全部返回 HTTP 200。

| Check | Result |
|---|---:|
| Organization nodes | 74 |
| Pages with Organization | 74 |
| Duplicate Organization pages | 0 |
| ContactPoint nodes | 74 |
| Unique ContactPoint values | 1 |
| `telephone=+8613703333750` | 74 |
| `telephone=+85270390436` | 0 |
| Pages retaining `wa.me/85270390436` | 76 |

唯一生产 ContactPoint：

```json
{
  "@type": "ContactPoint",
  "telephone": "+8613703333750",
  "email": "sales@dualcorelink.com",
  "contactType": "sales"
}
```

唯一 Organization 身份值保持：

```json
{
  "@id": "https://dualcorelink.com/#organization",
  "name": "DUALCORE LINK LIMITED",
  "url": "https://dualcorelink.com"
}
```

## 15. WhatsApp production verification

- `+852 7039 0436` 继续作为 WhatsApp 可见号码。
- 76/76 sitemap 页面保留 `https://wa.me/85270390436`。
- AWS `/en/` 同时包含新 telephone 和既有 WhatsApp link。
- Contact 页面、Footer 和 WhatsApp CTA 的来源文件未修改。
- WhatsApp-only 号码不再出现在任何 ContactPoint telephone。

## 16. Phase 3A production regression

以下 8 个页面均通过：

- 3 个 Resources
- 2 个 Regions
- 3 个 Products

逐页结果：

- HTTP 200：8/8
- Title 与成功本地构建一致：8/8
- 唯一且正确 canonical：8/8
- 单一 H1：8/8
- page-specific Product / Article / CreativeWork Schema：8/8
- BreadcrumbList：8/8
- CTA attribution：8/8
- WhatsApp link：8/8

Phase 3A 页面内容、metadata、H1、canonical、CTA 和页面专属 Schema 没有发生非预期变化。唯一预期变化是共享 Organization ContactPoint telephone。

## 17. Production SEO baseline

| Check | Result |
|---|---:|
| Sitemap HTTP | 200 |
| Sitemap URLs | 76 |
| URL HTTP 200 | 76/76 |
| Unique correct canonical | 76/76 |
| Single H1 | 76/76 |
| Product Schema | 36 |
| Article Schema | 15 |
| BreadcrumbList | 72 |
| localhost / staging / CMS leak | 0 |
| `robots.txt` | HTTP 200；与成功本地构建 byte-identical |
| `llms.txt` | HTTP 404 |

AWS test domain：

- `/en/`: HTTP 200
- `X-Robots-Tag`: `noindex, nofollow, noarchive`
- AWS 与 official `/en/about/` HTML byte-identical
- About HTML SHA-256: `6a92a1c0f36e32a141a436b40866afbb930670dbd3b92ba164302de8324e84f7`

`robots.txt` production/local SHA-256：

`20d225d8bfe2d3fb7d52daf5623d7d5756ee8e8eaa6fc5895a8456782e2b98f7`

## 18. Final Git state and closure

生产部署与生产验证完成后、更新本报告前：

- Branch: `main`
- Local HEAD: `8511d7b3a7438c459755fc060f932913cb915279`
- `origin/main`: `8511d7b3a7438c459755fc060f932913cb915279`
- Working tree: clean

本报告更新将通过独立 docs-only closure commit 封存。部署 workflow 配置了 `paths-ignore: docs/**`，因此 docs-only commit 不会触发第二次生产部署；生产 source SHA 保持为实施 commit。

本报告不声明排名、点击、曝光、GEO、Google 实体更新或重新抓取结果。
