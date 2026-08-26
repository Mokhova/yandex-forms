/* ===========================================================================
   portfolio v2 — генератор двух языковых версий кейса
   ---------------------------------------------------------------------------
   Разметка одна, тексты — два словаря. Запуск: `node build.mjs`
   На выходе: index.html (EN) и ru/index.html (RU).
   =========================================================================== */
import { writeFileSync, mkdirSync } from 'node:fs';

const LINKEDIN = 'https://www.linkedin.com/in/екатерина-мохова-a036a053/';
const RESUME   = 'https://disk.yandex.ru/i/5MKnDbh3JXLgug';
const MAIL     = 'mailto:katecherno@proton.me';
const ORIGIN   = 'https://mokhova.github.io/yandex-forms';

/* ===========================================================================
   EN — тексты сняты с макета (Figma 777:1731)
   =========================================================================== */
const en = {
  htmlLang: 'en',
  title: 'Yandex.Forms Redesign — Ekaterina Mokhova',
  descr: 'A UX/UI case study: rebuilding Yandex.Forms, the internal form builder used across the company — homepage, editor and style editor.',
  ogTitle: 'Yandex.Forms Redesign — UX/UI case study',
  ogDescr: 'Rebuilding the internal form builder used across Yandex: homepage, editor and style editor.',

  navCap: 'Contents:',
  navHome: 'home', navEditor: 'editor', navStyles: 'design',
  contactCap: 'Contact:',
  resume: 'resume', email: 'email',
  avatarLabel: 'To the top',
  skip: 'Skip to content',
  dockEmail: 'email',

  heroMetaL: '(UX)&nbsp;(UI)&nbsp;(WEB)',
  heroMetaR: '(2024—25)',
  heroTitle: 'Yandex.forms <br>redesign',
  heroAlt: 'The new Yandex.Forms editor',

  aboutEyebrow: '(about)',
  aboutTitle: 'A form builder for Yandex employees. <br>To measure customer satisfaction, <br>employee feedback and research. <br>Integrates with internal services',

  problemEyebrow: '(problem)',
  problemTitle: 'The service became obsolete',
  pUserLabel: '(user painpoints)',
  pUserStrong: 'Slow, buggy and missing features. ',
  pUserDim: 'Hard to build large forms and logic',
  pDevLabel: '(developers pain points)',
  pDevStrong: 'Hard to maintain the legacy stack and two versions. ',
  pDevDim: 'With only one frontend dev, two backend devs',
  pThemeLabel: '(old theme editor)',
  pThemeAlt: 'The old theme editor',
  pEditorLabel: '(old editor)',
  pEditorAlt: 'The old form editor',
  pDesignLabel: '(designer pain points)',
  pDesign1: 'No roadmap for the product or for improving the workflow',
  pDesign2: 'Part of the ecosystem, <br>but doesn’t use its patterns',
  pDesign3: 'Fixes drag on: <br>the only frontend dev <br>is overloaded',

  solEyebrow: '(solution)',
  solTitle: 'Swap the library in a year. <br>Tight deadline, huge scope, one frontend developer. <br>That’s where we split',
  solDevTitle: 'Developers: <br>rewrite, no redesign',
  solDevBody: 'The service gets faster, easier <br>to maintain, we hit the deadline. <br>For users it’s only a «repaint», won’t make their daily work easier.',
  solMeTitle: 'Designer (me): <br>improve the flow',
  solMeBody: 'Use the resources wisely: <br>swap the library, but also fix <br>the real problems and ship features users have asked for',

  outEyebrow: '(outcome)',
  outTitle: 'We’ve nailed it! <br>First numbers after release proved the call right',
  outM1: 'More custom themes created',
  m1Count: '1.5', m1Dec: '1', m1Prefix: '', m1Suffix: 'x', m1Text: '1.5x',
  outM2: 'Forms are created faster',
  m2Count: '-2', m2Dec: '0', m2Prefix: '', m2Suffix: 'min', m2Text: '-2min',
  numSep: '.',
  outN1: 'Positive feedback on the redesign, nobody went back to the old version',
  outN2: 'Metrics held steady: publishing just as often',
  outN3: 'Fewer support requests',

  actionsTitle: 'My actions',
  designTitle: 'So what’s the design?',
  resultEyebrow: '(the result)',

  /* ---------- chapter 1 — homepage ---------- */
  ch1Title: 'homepage',
  ch1OldHome: '(old homepage)', ch1OldHomeAlt: 'The old Forms homepage',
  ch1OldList: '(old list)',     ch1OldListAlt: 'The old forms list',
  ch1c1s: 'Irrelevant forms: “recently updated” are the last edited ones. ',
  ch1c1d: 'After publishing, people look after other points — the number of responses, for example',
  ch1c2s: 'An incomplete list: no groups, no templates, filters don’t save. ',
  ch1c2d: 'People’s workflows rarely change, <br>so setting filters every visit <br>is a pain. Groups also is a part of the workflow',
  ch1c3s: 'Static useless homepage. ',
  ch1c3d: 'Most of the space used for images of templates',
  ch1c4s: 'Confusing creation flow. ',
  ch1c4d: 'There are two ways to create a form — the button in the header and a template. The button only creates an empty form. A template creates any form, but looks like an image',

  ch1s1t: '01 — Dug into the history',
  ch1s1b: '<p>I found out that the current home page was built for the b2b service as a landing page describing the service features. When the product split into external and internal versions, <br>it was carried over untouched.</p>',
  ch1s2t: '02 — Wrote a question list and worked through the data <br>from a round of short interviews',
  ch1s2l: [
    'People group forms by topic or by the team. These users run recurring surveys with identical names, and the group tells them who works with a form and when. Right now these are two separate lists, which is very inconvenient',
    'Sorting by last edit isn’t useful. Everyone works differently depending on how many forms <br>and tasks they have: some need to see forms with new responses, others sort by response count, and so on.',
    'Some people duplicate forms and tweak them slightly, so the names stay identical — <br>they need another marker to tell them apart.',
    'When there are only a few forms, a table view is overkill.'
  ],
  ch1s3t: '03 — Formed a hypothesis: nobody needs this home page',
  ch1s3b: '<p>What they need is a dashboard highlighting key changes. A dashboard needs its own discovery round, and there was no time or budget — so the list is where to invest. It’s the main tool</p>',
  ch1s4t: '04 — Went through Yandex.Metrica <span class="dim">(GA analogue)</span>',
  ch1s4b: '<p>The list beats the home page and gets bookmarked: 17% of visits vs 4%. <br>Creating from a template and from scratch are equally popular. Filters get adjusted often — <br>on almost every visit.</p>',

  ch1f1t: 'New list becomes <br>a homepage',
  ch1f1b: '<p>No more bookmarking, no more jumping between pages</p>',
  ch1f2t: 'One place to create',
  ch1f2b: '<p>An empty form is just a template with no questions. I put every template in one place, in one style. Visible but compact, so it doesn’t steal room from the list. I designed it to grow, including with templates made by users themselves.</p>',
  ch1f3t: 'Customizable',
  ch1f3b: '<p>Depending on what you need, the list can be viewed as a table or as cards. I also added grouped view</p>',
  ch1f4t: 'Groups are visible. <br>Always',
  ch1f4b: '<p>A separate column in table view, a heading <br>in grouped view</p>',

  capHome: '(home aka list) & (grouped list)',
  capEditor: '(new editor) & (several pages)',
  capStyles: '(new styles editor)',
  ch1sh1: '(home aka list)',  ch1sh1Alt: 'The new forms list',
  ch1sh2: '(grouped list)',   ch1sh2Alt: 'The grouped list view',

  ch1r1t: 'Hypothesis confirmed',
  ch1r1b: 'Before release we ran UX testing on the prototypes and got confirmation <br>plus positive feedback. People completed tasks quickly and found what they needed right away',
  ch1r2t: 'Metrics held steady',
  ch1r2b: 'No negative feedback and no drop in metrics after release',
  ch1r3t: 'Filters work well',
  ch1r3b: 'People change them half as often now, because they’re saved',

  /* ---------- chapter 2 — editor ---------- */
  ch2Title: 'editor',
  ch2OldHome: '(old homepage)', ch2OldHomeAlt: 'The old editor',
  ch2OldList: '(old list)',     ch2OldListAlt: 'The old question editing popup',
  ch2c1s: 'Unclear and inflexible: hard to navigate, to differ the questions from one another. ',
  ch2c1d: 'Users only see the question type — number or choice. People navigate by the question’s text first, not the type',
  ch2c2s: 'Settings are hidden: images, hints, answers and type-specific options all live in a popup. ',
  ch2c2d: 'To check or edit anything you have to open the popup for every single question',
  ch2c3s: 'Order is hard to manage: questions can only be added to the end of the form. ',
  ch2c3d: 'No auto-scroll, no animation, no hint. Moving a question means drag-and-drop, which is poorly built in both design and code',
  ch2c4s: 'Conditions are invisible: only by clicking the icon. ',
  ch2c4d: 'Some questions should appear after certain answers on other questions. And people often miss them',
  ch2c5s: 'No page-level conditions. ',
  ch2c5d: 'Users need to show/hide whole pages depending on some answers. And it’s not supported',

  ch2s1t: '01 — Dug into the history',
  ch2s1b: '<p>Went through user feedback to shape the hypotheses for research</p>',
  ch2s2t: '02 — Research the question setup',
  ch2s2b: '<p>Looked at how questions work under the hood: what data each type holds and how it’s stored. Found that many types differ by a single setting. Email and phone, for instance, are plain text fields with different validation</p>',
  ch2s3t: '03 — Looked through the statistics',
  ch2s3b: '<p>Asked the PM to pull stats on how many questions and pages forms actually have, to work out the best way to design navigation and the adding of questions and pages</p>',
  ch2s4t: '04 — Went through Yandex.Metrica <span class="dim">(GA analogue)</span>',
  ch2s4b: '<p>Which questions, with which settings, get created most. Assigned each one a top-level type: text, choice, number and so on</p>',
  ch2s4Alt: 'Question type statistics',
  ch2s5t: '05 — Started a UX-research',
  ch2s5b: '<p>Wrote the full script for the prototype UX research. Built an interactive Figma prototype: animations, the new drag-and-drop and complex flows like adding logic at different levels</p>',

  ch2f1t: 'A rich card <br>with inline editing',
  ch2f1b: '<p>I moved the title, answers and key settings onto the card and hid the rare ones. The layout is consistent and block-based: shared blocks are always there, type-specific ones sit in their own types and only after the shared settings. No need to relearn every type. Win!</p><p>Settings are edited right on the card and everything saves automatically</p>',
  ch2f2t: 'Fewer types',
  ch2f2b: '<p>Cut question types from 27 to 8. Each question adapts to its data type through settings or validation. I gave every type an icon and a color so it’s easier to scan</p>',
  ch2f3t: 'Visible conditions',
  ch2f3b: '<p>Added page-level conditions. Question conditions sit right on the card, page conditions at the top of the page. Any condition collapses to its heading: easy to find, never in the way</p>',
  ch2f4t: 'Flexible ordering',
  ch2f4b: '<p>A question can be added anywhere in the form. Each card has two hover zones that reveal the matching add-question button</p>',
  ch2f5t: 'Useful navigation',
  ch2f5b: '<p>Instead of a plain question list I built navigation for the editor, showing the type and the text of each question</p><p>Nested questions are visualized <br>Questions can be added and deleted <br>Clicking a question scrolls the editor to its card <br>And best of all: questions can now be reordered straight from the navigation panel</p>',

  ch2sh1: '(new editor)',     ch2sh1Alt: 'The new Forms editor',
  ch2sh2: '(several pages)',  ch2sh2Alt: 'A form with several pages and conditions',

  ch2r1t: 'Successful UX-tests',
  ch2r1b: 'Every hypothesis was confirmed. The interface made <br>a positive impression and caused no difficulty',
  ch2r2t: 'Smooth release',
  ch2r2b: 'The new editor shipped whole at once, with a couple of months to switch over. <br>In the first week more than half moved to the new interface. <br>Within two weeks almost everyone had. Nobody went back to the old version',
  ch2r3t: 'Metrics improved',
  ch2r3b: 'Time spent in the editor is going down: by a minute or more depending on form size, <br>while the number of forms and publications stayed the same. <br>The new editor is clearer and the redundant steps are gone',

  /* ---------- chapter 3 — styles ---------- */
  ch3Title: 'styles',
  ch3OldStyle: '(old style)',       ch3OldStyleAlt: 'The old style editor',
  ch3OldList: '(old style list)',   ch3OldListAlt: 'The old style presets',
  ch3c1s: 'Few customizations. ',
  ch3c1d: 'People want to change control colors, spacing, the required-question marker and other elements',
  ch3c2s: 'Confusing colors naming. ',
  ch3c2d: 'Styles are rarely set up and the names don’t show which part of interface will be affected. Moreover palette is too small and the settings are scattered',
  ch3c3s: 'Opaque parameters: every setting uses the same control (a slider). ',
  ch3c3d: 'Values aren’t shown and there’s no preview of the result, which raises a lot of questions',
  ch3c4s: 'Unhelpful form preview. ',
  ch3c4d: 'No real spacing, no card the form is set on, no service header',
  ch3c5s: 'Outdated presets. ',
  ch3c5d: 'Colors too loud, low contrast, tired backgrounds and low-quality images',

  ch3s1t: '01 — Quick UX-tests',
  ch3s1b: '<p>Hallway, side-by-side, surveys in Pathway. Confirmed the hypotheses, including quantitatively</p>',
  ch3s2t: '02 — Went through Yandex.Metrica <span class="dim">(GA analogue)</span>',
  ch3s2b: '<p>To see which themes and parameters are the most popular</p>',
  ch3s3t: '03 — Studied users’ custom themes',
  ch3s3b: '<p>To understand what they were really after. Some forms are styled with hand-written CSS. <br>The frontend devs exported every property for me</p>',
  ch3s4t: '04 — Summed up all the data',
  ch3s4b: '<p>From Yandex.Metrica, the UX work and the analysis of user styles I built the final list of properties, ranked by popularity</p>',

  ch3f1t: 'A proper palette',
  ch3f1b: '<p>Pulled every color into its own block and visualized which element each one styles.</p><p>Added palette generation: if there’s a brand style, one brand color repaints every control in the form</p><p>By default the block shows only the three most-used colors. When you need finer control, just expand the rest. That way the interface never overloads anyone</p>',
  ch3f2t: 'Easy to scan',
  ch3f2b: '<p>I visualize parameter values, because people call the same property by different names and nobody knows what the range means. It’s simpler to show every option visually</p>',
  ch3f3t: 'Simpler navigation',
  ch3f3b: '<p>Grouped properties by object: text, background, buttons. Much easier to scan.</p><p>And so people who don’t need fine-grained control aren’t overloaded, there’s a separate block with the most popular properties</p>',
  ch3f4t: 'Spec for developers',
  ch3f4b: '<p>Documented every animation and how to automate color selection for the default themes to be added later. Built code prototypes in CodePen</p>',
  ch3f5t: 'Theme migration',
  ch3f5b: '<p>Developers couldn’t build some of the new properties from the mockups because of backward compatibility. Themes are stored as JSON, so I proposed updating that JSON once during the migration: save users’ custom themes as service themes. That way we kept their data, shipped the new editor, and people got room for one more theme of their own. Win-win :)</p>',
  ch3f6t: 'Contrast check',
  ch3f6b: '<p>Proposed a specific npm package. It checks contrast between text and background, controls and background, and text inside controls. WCAG-based</p>',
  ch3f7t: 'Form appearance spec',
  ch3f7b: '<p>A detailed guide to how every element behaves under different customization settings, and what the edge cases look like. It also solved a few long-standing display problems. For example, how to render certain controls without a border: I added the option to remove the control’s inner padding, and documented for the devs that in this case the standard control is swapped for the borderless one already in the library!</p>',

  ch3sh1: '(new styles editor)', ch3sh1Alt: 'The new style editor',
  ch3sh2: '(new styles editor)', ch3sh2Alt: 'The new style editor, full view',

  ch3r1t: 'New style editor is trending up',
  ch3r1b: 'After release people create more custom themes and edit existing ones more often. <br>And they pick the new presets more too',
  ch3r2t: 'New properties caught on',
  ch3r2b: 'Within a month of release the new properties were already among the most used',

  footerName: 'Ekaterina Mokhova',
  footerYears: '(2024—25)'
};

/* ===========================================================================
   RU — перевод макета. Тон и терминология те же, что на mokhova.github.io
   =========================================================================== */
const ru = {
  htmlLang: 'ru',
  title: 'Редизайн Яндекс.Форм — Екатерина Мохова',
  descr: 'UX/UI-кейс: редизайн Яндекс.Форм — внутреннего конструктора форм компании. Главная и список, конструктор и темы.',
  ogTitle: 'Редизайн Яндекс.Форм — UX/UI-кейс',
  ogDescr: 'Редизайн внутреннего конструктора форм Яндекса: главная и список, конструктор и темы.',

  navCap: 'Разделы:',
  navHome: 'главная', navEditor: 'конструктор', navStyles: 'темы',
  contactCap: 'Контакты:',
  resume: 'резюме', email: 'почта',
  avatarLabel: 'Наверх',
  skip: 'К содержимому',
  dockEmail: 'почта',

  heroMetaL: '(UX)&nbsp;(UI)&nbsp;(WEB)',
  heroMetaR: '(2024—25)',
  heroTitle: 'Редизайн <br>Яндекс.Форм',
  heroAlt: 'Новый конструктор Яндекс.Форм',

  aboutEyebrow: '(что за сервис)',
  aboutTitle: 'Конструктор опросов, анкет <br>и любых форм для сотрудников Яндекса. <br>Интегрируется с внутренними сервисами',

  problemEyebrow: '(проблема)',
  problemTitle: 'Формы сильно устарели',
  pUserLabel: '(боли пользователей)',
  pUserStrong: 'Работает медленно и с ошибками. ',
  pUserDim: 'Сложно создавать большие формы и логику, не хватает функциональности',
  pDevLabel: '(боли разработки)',
  pDevStrong: 'Сложно поддерживать старый стек и две версии: основную и для интеграции. ',
  pDevDim: 'Большая загрузка: один фронтендер, два бекендера',
  pThemeLabel: '(старый редактор тем)',
  pThemeAlt: 'Старый редактор тем',
  pEditorLabel: '(старый конструктор)',
  pEditorAlt: 'Старый конструктор форм',
  pDesignLabel: '(боли дизайна)',
  pDesign1: 'Нет плана по развитию продукта и оптимизации работы',
  pDesign2: 'Часть экосистемы, <br>но не использует её паттерны',
  pDesign3: 'Правки затягиваются: <br>фронтендер один <br>и перегружен',

  solEyebrow: '(решение)',
  solTitle: 'Обновить сервис за 1 год. <br>Конфликт интересов: сроки сжатые, объём работ огромный. <br>Продакт взял обязательства по срокам перед компанией',
  solDevTitle: 'Разработка: <br>переписать без редизайна',
  solDevBody: 'Сервис будет работать быстрее, <br>поддержка проще и уложимся в сроки. <br>Для пользователей будет только «перекрашивание» интерфейса, не упростит их ежедневные задачи.',
  solMeTitle: 'Дизайн (я): <br>улучшить сценарии форм',
  solMeBody: 'Хочется рационально использовать <br>ресурсы: поменять библиотеку, <br>но ещё исправить проблемы, сделать функциональность, которую давно просили пользователи',

  outEyebrow: '(результат)',
  outTitle: 'У нас получилось! <br>Первые результаты релиза подтвердили верность решения',
  outM1: 'Чаще создают темы',
  m1Count: '1.5', m1Dec: '1', m1Prefix: '×', m1Suffix: ' раза', m1Text: '×1,5 раза',
  outM2: 'Ускорилось создание формы',
  m2Count: '-2', m2Dec: '0', m2Prefix: '', m2Suffix: ' мин', m2Text: '-2 мин',
  numSep: ',',
  outN1: 'Хорошие отзывы о редизайне, никто не вернулся к старой версии',
  outN2: 'Метрики не просели: публикуют так же часто',
  outN3: 'Снижаются обращения в поддержку',

  actionsTitle: 'Что сделала',
  designTitle: 'Какой тогда дизайн?',
  resultEyebrow: '(какой результат)',

  /* ---------- глава 1 — главная и список ---------- */
  ch1Title: 'главная и список',
  ch1Track: '20px',
  ch1OldHome: '(старая главная)', ch1OldHomeAlt: 'Старая главная Форм',
  ch1OldList: '(старый список)',  ch1OldListAlt: 'Старый список форм',
  ch1c1s: 'Неактуальные формы на главной: ',
  ch1c1d: 'это последние отредактированные. После публикации важны другие признаки, например количество ответов',
  ch1c2s: 'Неполный список: нет шаблонов и информации о группах. ',
  ch1c2d: 'Фильтры не сохраняются, хотя сценарии работы меняются редко — неудобно настраивать их в каждый визит',
  ch1c3s: 'Декоративная главная: ',
  ch1c3d: 'больше половины страницы — общая статичная информация',
  ch1c4s: 'Путаница с созданием: ',
  ch1c4d: 'есть два способа создания формы — по кнопке в шапке сервиса и из шаблона. По кнопке можно создать только пустую форму. Из шаблона — любую',

  ch1s1t: '01 — Подняла историю',
  ch1s1b: '<p>Выяснила, что текущая главная сделана для b2b-сервиса и была лендингом с описанием возможностей сервиса. После разделения <br>на внешний и внутренний продукты её перенесли без изменений.</p>',
  ch1s2t: '02 — Составила список вопросов и обработала данные <br>небольших интервью',
  ch1s2l: [
    'Формы объединяют в группы по смыслу или отделу, который с ними работает. У таких пользователей есть регулярные опросы, которые называются одинаково, и группа помогает понять, кто и когда работает с формой. Сейчас это два независимых списка, что очень неудобно.',
    'Сортировка по последнему изменению неактуальна. Все работают по-разному <br>в зависимости от количества форм и задач: кому-то важно видеть формы с новыми ответами, кому-то — по количеству ответов и т.д.',
    'Некоторые копируют формы и немного меняют, названия остаются одинаковыми — <br>нужен дополнительный маркёр, чтобы отличать.',
    'Когда мало форм, табличный вид излишен.'
  ],
  ch1s3t: '03 — Выдвинула гипотезу: людям не нужна главная в текущем виде',
  ch1s3b: '<p>Нужен дашборд с хайлайтом ключевых изменений. Дашборд надо кастдевить отдельно, нет времени и ресурсов, поэтому стоит улучшать список. Он — основной инструмент</p>',
  ch1s4t: '04 — Изучила Яндекс.Метрику <span class="dim">(аналог GA)</span>',
  ch1s4b: '<p>Список популярнее главной, его сохраняют в закладки: 17% визитов против 4%. <br>Создание из шаблона и с нуля одинаково популярны. Фильтры настраивают часто, <br>почти в каждый визит.</p>',

  ch1f1t: 'Новая главная',
  ch1f1b: '<p>Список форм теперь главная страница. Теперь не будет необходимости делать закладки, переключаться между несколькими страницами</p>',
  ch1f2t: 'Один блок создания',
  ch1f2b: '<p>Пустая форма — это шаблон без вопросов. Сделала все шаблоны в одном месте и стиле. Заметно, но компактно, чтобы не отнимать место у списка. Предусмотрела, что шаблоны будут пополняться, в том числе, самими пользователями.</p>',
  ch1f3t: 'Кастомизируемый',
  ch1f3b: '<p>В зависимости от потребностей, можно смотреть список в табличном виде или карточками. Добавила возможность смотреть с группировкой</p>',
  ch1f4t: 'Группы всегда видно',
  ch1f4b: '<p>В табличном виде — отдельным столбцом, <br>в сгруппированном — заголовком</p>',

  capHome: '(главная, она же список) и (список с группировкой)',
  capEditor: '(новый конструктор) и (несколько страниц)',
  capStyles: '(новый редактор тем)',
  ch1sh1: '(главная, она же список)', ch1sh1Alt: 'Новый список форм',
  ch1sh2: '(список с группировкой)',  ch1sh2Alt: 'Список с группировкой',

  ch1r1t: 'Гипотеза подтвердилась',
  ch1r1b: 'До релиза проводили UX-тестирование прототипов, получили подтверждение <br>и положительные отзывы. Люди быстро справлялись с задачами, сразу находили нужные элементы',
  ch1r2t: 'Стабильные метрики',
  ch1r2b: 'После релиза не было негативных отзывов и просадки метрик',
  ch1r3t: 'Фильтры работают!',
  ch1r3b: 'Их стали менять в два раза меньше, потому что они сохраняются',

  /* ---------- глава 2 — конструктор ---------- */
  ch2Title: 'конструктор',
  ch2OldHome: '(старая главная)', ch2OldHomeAlt: 'Старый конструктор',
  ch2OldList: '(старый список)',  ch2OldListAlt: 'Старое окно редактирования вопроса',
  ch2c1s: 'Сложно ориентироваться: ',
  ch2c1d: 'видно только тип вопроса, например, число или список. Вопросы одного типа невозможно отличить друг от друга. Люди ориентируются в первую очередь по тексту, а не типу',
  ch2c2s: 'Не видно параметров: ',
  ch2c2d: 'картинки, пояснения, ответы и настройки типа спрятаны в попап. Чтобы что-то проверить, попап нужно открывать для каждого вопроса',
  ch2c3s: 'Сложно управлять порядком: ',
  ch2c3d: 'вопросы добавляются только в конец формы. Нет ни подскролла, ни анимации, ни подсказки. Чтобы переместить вопрос, нужен драг-н-дроп, который плохо реализован по дизайну и технически',
  ch2c4s: 'Не видно условия: ',
  ch2c4d: 'некоторые вопросы нужно показать только при определённых ответах на предыдущие. Условия видно, только если нажать иконку',
  ch2c5s: 'Нет условий на страницу: ',
  ch2c5d: 'пользователи давно просили добавить условия на показ целого шага формы (страницы)',

  ch2s1t: '01 — Изучила фидбек пользователей',
  ch2s1b: '<p>Чтобы сформировать гипотезы для исследования</p>',
  ch2s2t: '02 — Изучила, как технически устроены вопросы',
  ch2s2b: '<p>Какие данные у каждого типа и как они хранятся. Выяснила, что есть много типов вопросов, которые отличаются только одной настройкой друг от друга. Например, почта и телефон — обычные текстовые поля, просто с разной валидацией</p>',
  ch2s3t: '03 — Посмотрела статистику',
  ch2s3b: '<p>Попросила продакта собрать статистику о том, сколько вопросов в формах, сколько страниц. Чтобы понять, как удобнее сделать навигацию, добавление вопросов и страниц</p>',
  ch2s4t: '04 — Изучила Яндекс.Метрику <span class="dim">(аналог GA)</span>',
  ch2s4b: '<p>Какие вопросы с какими настройками создают чаще. Присвоила каждому из них верхнеуровневый тип: текст, выбор, число и т.д.</p>',
  ch2s4Alt: 'Статистика по типам вопросов',
  ch2s5t: '05 — Запустила UX-исследование',
  ch2s5b: '<p>Прописала полный скрипт для UX-исследования прототипа. Сделала интерактивный прототип в Figma: с анимациями, новым драг-н-дропом и сложными сценариями — добавлением логики на разные уровни</p>',

  ch2f1t: 'Богатая карточка <br>и прямое редактирование',
  ch2f1b: '<p>Вынесла название, ответы и важные настройки на карточку. Редкие — скрыла. Вёрстка последовательная и блочная: общие блоки есть всегда, уникальные — в своих типах и только после общих настроек. Не нужно разбираться с каждым типом отдельно. Win!</p><p>Сделала редактирование параметров прямо в карточке, всё автоматически сохраняется</p>',
  ch2f2t: 'Минимум типов',
  ch2f2b: '<p>Сократила типы вопросов с 27 до 8. Сделала кастомизацию каждого вопроса под тип данных: либо настройками, либо валидацией. Добавила типам иконку и цвет, чтобы легче ориентироваться</p>',
  ch2f3t: 'Прозрачные условия',
  ch2f3b: '<p>Добавила условия для страницы. Условия вопроса находятся прямо в карточке, страницы — у начала страницы. Все условия можно свернуть до заголовка: их просто найти, при этом не занимают много места</p>',
  ch2f4t: 'Гибкий порядок',
  ch2f4b: '<p>Вопрос можно добавить в любое место формы. У карточки две области ховера, по наведению на которые появляются соответствующие кнопки добавления вопроса</p>',
  ch2f5t: 'Удобная навигация',
  ch2f5b: '<p>Вместо списка вопросов сделала навигацию по конструктору: вынесла тип и текст вопроса</p><p>Добавила визуализацию вложенных вопросов <br>Можно добавлять и удалять вопросы <br>По нажатию на вопрос конструктор прокрутится до карточки этого вопроса <br>И, главное: теперь можно перемещать вопросы прямо в панели навигации</p>',

  ch2sh1: '(новый конструктор)',   ch2sh1Alt: 'Новый конструктор Форм',
  ch2sh2: '(несколько страниц)',   ch2sh2Alt: 'Форма с несколькими страницами и условиями',

  ch2r1t: 'Успешные UX-тесты',
  ch2r1b: 'Все гипотезы подтвердились. Интерфейс вызвал <br>положительное впечатление и не вызвал затруднений',
  ch2r2t: 'Гладкий релиз',
  ch2r2b: 'Новый конструктор релизили целиком и дали возможность перейти на новый интерфейс в течение пары месяцев. <br>В первую неделю после релиза больше половины перешли на новый интерфейс. <br>За две недели почти все перешли. Никто не вернулся к старой версии',
  ch2r3t: 'Улучшение метрик',
  ch2r3b: 'Время пользования конструктором уменьшается: на минуту и более в зависимости от размера формы, <br>количество форм и публикаций осталось прежним. <br>Новый редактор нагляднее, убраны лишние шаги',

  /* ---------- глава 3 — темы ---------- */
  ch3Title: 'темы',
  ch3OldStyle: '(старое оформление)',  ch3OldStyleAlt: 'Старый редактор тем',
  ch3OldList: '(старый список тем)',   ch3OldListAlt: 'Старые пресеты тем',
  ch3c1s: 'Мало кастомизации: ',
  ch3c1d: 'пользователи хотят менять цвета контролов, отступы, маркёр обязательного вопроса и другие элементы',
  ch3c2s: 'Путаница с цветами: ',
  ch3c2d: 'темы настраивают редко; по названиям неясно, какой цвет изменится. Палитры не хватает, а настройки разбросаны по разным местам',
  ch3c3s: 'Непонятные параметры: ',
  ch3c3d: 'для всех настроек используется один и тот же интерфейс (слайдер). Значения не показаны, нет визуализации результата — возникает много вопросов',
  ch3c4s: 'Неудобное превью формы: ',
  ch3c4d: 'нет реальных отступов, карточки, на которой размещена форма, и шапки сервиса',
  ch3c5s: 'Пресеты устарели: ',
  ch3c5d: 'яркие цвета, низкий контраст, неактуальные фоны и картинки плохого качества',

  ch3s1t: '01 — Провела быстрые UX-тесты',
  ch3s1b: '<p>Коридорные, side-by-side, опросы в Pathway. Подтвердила гипотезы, в том числе количественно</p>',
  ch3s2t: '02 — Изучила Яндекс.Метрику <span class="dim">(аналог GA)</span>',
  ch3s2b: '<p>Посмотрела, какие темы и параметры самые популярные</p>',
  ch3s3t: '03 — Изучила кастомные темы пользователей',
  ch3s3b: '<p>Чтобы понять, какой конечный результат хотят. Некоторые из форм стилизованы самописными css-свойствами. <br>Фронтендеры выгрузили все свойства</p>',
  ch3s4t: '04 — Свела все данные',
  ch3s4b: '<p>На основании Яндекс.Метрики, UX и анализа стилей пользователей сделала конечный список свойств, ранжированный по популярности</p>',

  ch3f1t: 'Полноценная палитра',
  ch3f1b: '<p>Вынесла все цвета в отдельный блок. Визуализировала, какой элемент стилизует каждый цвет.</p><p>Сделала генерацию палитры: когда есть фирменный стиль, можно перекрасить все контролы формы, указав только один цвет — цвет бренда</p><p>По умолчанию блок показывает только три популярных цвета. Когда нужно точнее настроить стили, можно просто раскрыть остальные. Так интерфейс не нагружает пользователя</p>',
  ch3f2t: 'Наглядный',
  ch3f2b: '<p>Визуализирую значения параметров, потому что пользователи по-разному называют одни и те же свойства, и никто не понимает границы значений. Проще показать все варианты визуально</p>',
  ch3f3t: 'Упрощённая навигация',
  ch3f3b: '<p>Сгруппировала свойства по объекту: тексты, фон, кнопки. Так проще ориентироваться.</p><p>Чтобы не перегружать пользователей, которым не нужна точечная кастомизация, сделала отдельный блок с топом самых популярных свойств</p>',
  ch3f4t: 'Спека для разработчиков',
  ch3f4b: '<p>Прописала все анимации, как автоматизировать подбор цветов для дефолтных тем, которые будут добавляться. Сделала прототипы кодом в CodePen</p>',
  ch3f5t: 'Миграция тем',
  ch3f5b: '<p>Некоторые новые свойства разработка не могла сделать по макетам из-за сложностей с обратной совместимостью. Темы хранятся в json. Я предложила один раз при переезде обновить этот json: сохранить кастомные темы пользователей как сервисные. Таким образом, мы не потеряли данные пользователей, но при этом дали бы новый редактор и появилась бы возможность сделать ещё одну «свою» тему. Win-win :)</p>',
  ch3f6t: 'Проверка контраста',
  ch3f6b: '<p>Предложила конкретный npm-пакет. Он проверяет контраст текста и фона, контролов и фона, текста в контролах. Схема WCAG</p>',
  ch3f7t: 'Спека внешнего вида формы',
  ch3f7b: '<p>Это подробный гайд, как ведут себя все элементы при разных параметрах кастомизации, как выглядят крайние случаи. И даже решила несколько старых проблем в отображении элементов формы. Например, как отображать некоторые контролы без обводки: добавила возможность убирать паддинги внутри контрола. Описала разработчикам, что в этом случае обычный контрол меняется контролом без обводки из текущей библиотеки!</p>',

  ch3sh1: '(новый редактор тем)', ch3sh1Alt: 'Новый редактор тем',
  ch3sh2: '(новый редактор тем)', ch3sh2Alt: 'Новый редактор тем, полный вид',

  ch3r1t: 'Темы популярнее',
  ch3r1b: 'После релиза стали больше создавать свои темы и редактировать уже созданные. <br>И чаще выбирают новые пресеты тем',
  ch3r2t: 'Новые свойства популярны',
  ch3r2b: 'Уже через месяц после релиза новые свойства стали в топе по использованию',

  footerName: 'Екатерина Мохова',
  footerYears: '(2024—25)'
};

/* ===========================================================================
   Шаблон. Геометрия десктопа — 1280 из макета, числа проставлены инлайном
   там, где в макете абсолютная раскладка (коллажи и художественные сцены).
   =========================================================================== */
const card = (s, d) => `<p class="h3">${s}<span class="dim">${d}</span></p>`;

/* длинный заголовок главы не влезает в трекинг макета — поджимаем разрядку */
const track = (v) => (v ? ` style="letter-spacing:${v};text-indent:${v}"` : '');

const step = (t, body) => `
      <div class="step">
        <h3 class="h3">${t}</h3>
        <div class="body-16">${body}</div>
      </div>`;

const rule = `
      <div class="step__rule"></div>`;

const resultItem = (t, b) => `
      <div class="result-item">
        <h3 class="h2">${t}</h3>
        <div class="body-16"><p>${b}</p></div>
      </div>`;

const resultRule = `
      <div class="result-rule"></div>`;

function render(t, { A, langNav }) {
  const showcase = (label, cls, shot, src, alt2, blob) => `
  <section class="showcase">
    ${blob || ''}
    <div class="showcase__item" data-reveal>
      <p class="${cls}">${label}</p>
      <div class="showcase__glass">
        <figure class="showcase__shot" style="height:${shot}px"><img loading="lazy" decoding="async" src="${A}img/${src}" alt="${alt2}"></figure>
      </div>
    </div>
  </section>`;

  return `<!DOCTYPE html>
<html lang="${t.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${t.title}</title>
<meta name="description" content="${t.descr}">
<meta name="author" content="${t.footerName}">
<meta property="og:title" content="${t.ogTitle}">
<meta property="og:description" content="${t.ogDescr}">
<meta property="og:type" content="website">
<meta property="og:image" content="${A}img/hero-editor.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#e5e0db">
<link rel="icon" href="${A}favicon.svg" type="image/svg+xml">
<link rel="preload" as="font" type="font/woff2" href="${A}fonts/Gilroy-Semibold.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="${A}fonts/Gilroy-Bold.woff2" crossorigin>
<link rel="stylesheet" href="${A === 'assets/' ? 'css' : '../css'}/fonts.css?v=8">
<link rel="stylesheet" href="${A === 'assets/' ? 'css' : '../css'}/style.css?v=8">
<link rel="alternate" hreflang="en" href="${ORIGIN}/">
<link rel="alternate" hreflang="ru" href="${ORIGIN}/ru/">
<link rel="alternate" hreflang="x-default" href="${ORIGIN}/">
</head>
<body>

<a class="skip" href="#top">${t.skip}</a>

<header class="header" id="header">
  <div class="header__inner">
    <nav class="nav">
      <span class="nav__cap">${t.navCap}</span>
      <a href="#homepage" data-nav="homepage">${t.navHome}</a>
      <a href="#editor" data-nav="editor">${t.navEditor}</a>
      <a href="#styles" data-nav="styles">${t.navStyles}</a>
    </nav>
    <a class="avatar" href="#top" aria-label="${t.avatarLabel}">
      <img src="${A}img/avatar.png" alt="">
    </a>
    <nav class="nav nav--right">
      <span class="nav__cap">${t.contactCap}</span>
      <a href="${RESUME}" target="_blank" rel="noopener">${t.resume}</a>
      <a href="${MAIL}">${t.email}</a>
      <a href="${LINKEDIN}" target="_blank" rel="noopener">linkedin</a>
      <span class="lang">${langNav}</span>
    </nav>
  </div>
</header>

<main class="page" id="top">

  <!-- ================= HERO ================= -->
  <section class="hero">
    <div class="hero__card">
      <div class="hero__inner">
        <div class="hero__meta">
          <p>${t.heroMetaL}</p>
          <p>${t.heroMetaR}</p>
        </div>
        <div class="hero__stack">
          <h1 class="hero__title" data-hero-title>${t.heroTitle}</h1>
          <div class="glass" data-parallax="0.06">
            <figure class="hero__shot">
              <img src="${A}img/hero-editor.png" alt="${t.heroAlt}">
            </figure>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= ABOUT ================= -->
  <section class="section section--about">
    <p class="eyebrow" data-reveal>${t.aboutEyebrow}</p>
    <h2 class="about__title" data-reveal>${t.aboutTitle}</h2>
  </section>

  <!-- ================= PROBLEM ================= -->
  <section class="section section--problem">
    <div class="section__head" data-reveal>
      <p class="eyebrow">${t.problemEyebrow}</p>
      <h2 class="h2">${t.problemTitle}</h2>
    </div>

    <div class="grid" data-reveal-stagger>
      <div class="grid__row grid__row--a">
        <div class="card card--pt28">
          <p class="label">${t.pUserLabel}</p>
          ${card(t.pUserStrong, t.pUserDim)}
        </div>
        <div class="card">
          <p class="label">${t.pDevLabel}</p>
          ${card(t.pDevStrong, t.pDevDim)}
        </div>
        <div class="card card--pt40">
          <p class="label">${t.pThemeLabel}</p>
          <div class="shot-gallery">
            <figure class="shot shot--theme">
              <img loading="lazy" decoding="async" src="${A}img/old-theme-editor.png" alt="${t.pThemeAlt}">
            </figure>
            <figure class="shot shot--editor shot--dup">
              <img loading="lazy" decoding="async" src="${A}img/old-editor.png" alt="${t.pEditorAlt}">
            </figure>
          </div>
        </div>
      </div>

      <div class="grid__row grid__row--b">
        <div class="card card--wide">
          <p class="label">${t.pEditorLabel}</p>
          <figure class="shot shot--editor">
            <img loading="lazy" decoding="async" src="${A}img/old-editor.png" alt="${t.pEditorAlt}">
          </figure>
        </div>
        <div class="card card--narrow">
          <p class="label">${t.pDesignLabel}</p>
          <div class="stack-list">
            <p class="h3">${t.pDesign1}</p>
            <div class="rule"></div>
            <p class="h3">${t.pDesign2}</p>
            <div class="rule"></div>
            <p class="h3">${t.pDesign3}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= SOLUTION ================= -->
  <section class="section section--solution">
    <div class="section__head" data-reveal>
      <p class="eyebrow">${t.solEyebrow}</p>
      <h2 class="h2">${t.solTitle}</h2>
    </div>

    <div class="versus" data-reveal-stagger>
      <div class="card card--dark">
        <p class="h3">${t.solDevTitle}</p>
        <p class="body-18">${t.solDevBody}</p>
      </div>
      <div class="card card--light">
        <p class="h3">${t.solMeTitle}</p>
        <p class="body-18 dim">${t.solMeBody}</p>
      </div>
      <span class="versus__mark" aria-hidden="true">VS</span>
    </div>
  </section>

  <!-- ================= OUTCOME ================= -->
  <section class="section section--outcome">
    <div class="section__head" data-reveal>
      <p class="eyebrow">${t.outEyebrow}</p>
      <h2 class="h2">${t.outTitle}</h2>
    </div>

    <div class="outcome">
      <div class="outcome__row" data-reveal-stagger>
        <div class="metric">
          <p class="h3">${t.outM1}</p>
          <p class="metric__value" data-count="${t.m1Count}" data-decimals="${t.m1Dec}" data-prefix="${t.m1Prefix}" data-suffix="${t.m1Suffix}" data-sep="${t.numSep}">${t.m1Text}</p>
        </div>
        <div class="metric">
          <p class="h3">${t.outM2}</p>
          <p class="metric__value" data-count="${t.m2Count}" data-decimals="${t.m2Dec}" data-prefix="${t.m2Prefix}" data-suffix="${t.m2Suffix}" data-sep="${t.numSep}">${t.m2Text}</p>
        </div>
      </div>
      <div class="outcome__row" data-reveal-stagger>
        <div class="note"><p class="h3">${t.outN1}</p></div>
        <div class="note"><p class="h3">${t.outN2}</p></div>
        <div class="note"><p class="h3">${t.outN3}</p></div>
      </div>
    </div>
  </section>

  <!-- ================= CHAPTER 1 — HOMEPAGE ================= -->
  <section class="chapter chapter--home" id="homepage">
    <div class="chapter__blob" data-blob="0.12"></div>
    <h2 class="chapter__title"${track(t.ch1Track)}>${t.ch1Title}</h2>
  </section>

  <div class="collage" style="height:662px">
    <div class="card card--shot" data-reveal style="left:440.5px;top:0;width:400px;height:275px">
      <p class="label">${t.ch1OldHome}</p>
      <figure class="shot" style="width:376px;height:219px;border-radius:16px">
        <img loading="lazy" decoding="async" src="${A}img/home-old-homepage.png" alt="${t.ch1OldHomeAlt}">
      </figure>
    </div>
    <div class="card card--shot" data-reveal style="left:440.5px;top:287px;width:400px;height:275px">
      <p class="label">${t.ch1OldList}</p>
      <figure class="shot" style="width:376px;height:219px;border-radius:16px">
        <img loading="lazy" decoding="async" src="${A}img/home-old-list.png" alt="${t.ch1OldListAlt}">
      </figure>
    </div>
    <div class="card" data-reveal style="left:27.5px;top:35px;width:401px;height:224px">${card(t.ch1c1s, t.ch1c1d)}</div>
    <div class="card" data-reveal style="left:27.5px;top:271px;width:401px;height:248px">${card(t.ch1c2s, t.ch1c2d)}</div>
    <div class="card" data-reveal style="left:852.5px;top:76px;width:400px;height:152px">${card(t.ch1c3s, t.ch1c3d)}</div>
    <div class="card" data-reveal style="left:852.5px;top:240px;width:400px;height:272px">${card(t.ch1c4s, t.ch1c4d)}</div>
  </div>

  <section class="section section--actions">
    <h2 class="h2" data-reveal>${t.actionsTitle}</h2>
    <article class="paper-card" data-reveal>
${step(t.ch1s1t, t.ch1s1b)}${rule}
      <div class="step">
        <h3 class="h3">${t.ch1s2t}</h3>
        <ul class="bullets body-16">
${t.ch1s2l.map((li) => `          <li><span>${li}</span></li>`).join('\n')}
        </ul>
      </div>${rule}
${step(t.ch1s3t, t.ch1s3b)}${rule}
${step(t.ch1s4t, t.ch1s4b)}
    </article>
  </section>

  <section class="section section--design">
    <h2 class="h2" data-reveal>${t.designTitle}</h2>

    <article class="feature" style="height:433px" data-reveal>
      <div class="feature__art">
        <div class="blob" style="left:100px;top:110px;width:440px;height:212px;background:var(--orange-soft);filter:blur(68px)" data-blob="0.05"></div>
        <div class="pic pic--plain" style="left:40.5px;top:63.25px;width:560px;height:305.5px"><img loading="lazy" decoding="async" src="${A}img/hp-newdesign-1.png" alt=""></div>
      </div>
      <div class="feature__copy" style="left:660px;top:128px">
        <h3 class="h2">${t.ch1f1t}</h3>
        <div class="body-16">${t.ch1f1b}</div>
      </div>
    </article>

    <article class="feature" style="height:433px" data-reveal>
      <div class="feature__art">
        <div class="blob" style="left:541px;top:191px;width:518px;height:51px;background:var(--orange-soft);filter:blur(76px)" data-blob="0.05"></div>
        <div class="pic pic--plain" style="left:520px;top:182px;width:555.5px;height:67.5px"><img loading="lazy" decoding="async" src="${A}img/home-d2-create.png" alt=""></div>
      </div>
      <div class="feature__copy" style="left:80px;top:128px">
        <h3 class="h2">${t.ch1f2t}</h3>
        <div class="body-16">${t.ch1f2b}</div>
      </div>
    </article>

    <article class="feature" style="height:433px" data-reveal>
      <div class="feature__art">
        <div class="blob" style="left:209px;top:125px;width:291px;height:210px;background:var(--orange-soft);filter:blur(88px)" data-blob="0.05"></div>
        <div class="blob" style="left:185px;top:144px;width:121px;height:114px;background:var(--orange-soft);opacity:.5;filter:blur(34px)"></div>
        <div class="blob" style="left:254px;top:171px;width:121px;height:114px;background:var(--orange-soft);opacity:.5;filter:blur(34px)"></div>
        <div class="pic pic--plain" style="left:111px;top:91px;width:418px;height:252px"><img loading="lazy" decoding="async" src="${A}img/hp-newdesign-3.png" alt=""></div>
      </div>
      <div class="feature__copy" style="left:589px;top:128px">
        <h3 class="h2">${t.ch1f3t}</h3>
        <div class="body-16">${t.ch1f3b}</div>
      </div>
    </article>

    <article class="feature" style="height:433px" data-reveal>
      <div class="feature__art">
        <div class="pic pic--plain" style="left:475.5px;top:82px;width:598.5px;height:210.5px"><img loading="lazy" decoding="async" src="${A}img/hp-newdesign-4.png" alt=""></div>
      </div>
      <div class="feature__copy" style="left:80px;top:128px">
        <h3 class="h2">${t.ch1f4t}</h3>
        <div class="body-16">${t.ch1f4b}</div>
      </div>
    </article>
  </section>

  <section class="showcase showcase--home" style="padding:32px 0 64px;gap:60px" data-cap="${t.capHome}">
    <div class="showcase__blob" style="left:-25px;top:129px;width:1265px;height:674px;background:var(--orange-soft);opacity:.7" data-blob="0.1"></div>
    <div class="showcase__item" data-reveal>
      <p class="eyebrow">${t.ch1sh1}</p>
      <div class="showcase__glass">
        <figure class="showcase__shot" style="height:694px"><img loading="lazy" decoding="async" src="${A}img/home-list.png" alt="${t.ch1sh1Alt}"></figure>
      </div>
    </div>
    <div class="showcase__blob" style="left:79px;top:1016px;width:1122px;height:603px;background:var(--orange-soft);opacity:.7" data-blob="0.1"></div>
    <div class="showcase__item" data-reveal>
      <p class="eyebrow">${t.ch1sh2}</p>
      <div class="showcase__glass">
        <figure class="showcase__shot" style="height:694px"><img loading="lazy" decoding="async" src="${A}img/home-grouped-list.png" alt="${t.ch1sh2Alt}"></figure>
      </div>
    </div>
  </section>

  <section class="section section--result">
    <article class="result-card" data-reveal>
      <p class="eyebrow">${t.resultEyebrow}</p>
${resultItem(t.ch1r1t, t.ch1r1b)}${resultRule}${resultItem(t.ch1r2t, t.ch1r2b)}${resultRule}${resultItem(t.ch1r3t, t.ch1r3b)}
    </article>
  </section>

  <!-- ================= CHAPTER 2 — EDITOR ================= -->
  <section class="chapter chapter--editor" id="editor">
    <div class="chapter__blob" data-blob="0.12"></div>
    <h2 class="chapter__title"${track(t.ch2Track)}>${t.ch2Title}</h2>
  </section>

  <div class="collage" style="height:874px">
    <div class="card card--shot card--shot-l" data-reveal style="left:440.5px;top:0;width:400px;height:275px">
      <p class="label">${t.ch2OldHome}</p>
      <figure class="shot" style="width:376px;height:219px;border-radius:8px">
        <img loading="lazy" decoding="async" src="${A}img/editor-old-homepage.png" alt="${t.ch2OldHomeAlt}">
      </figure>
    </div>
    <div class="card card--shot card--shot-l" data-reveal style="left:440.5px;top:287px;width:400px;height:275px">
      <p class="label">${t.ch2OldList}</p>
      <figure class="shot" style="width:376px;height:219px;border-radius:8px">
        <img loading="lazy" decoding="async" src="${A}img/editor-old-list.png" alt="${t.ch2OldListAlt}">
      </figure>
    </div>
    <div class="card" data-reveal style="left:27.5px;top:99px;width:401px;height:272px">${card(t.ch2c1s, t.ch2c1d)}</div>
    <div class="card" data-reveal style="left:27.5px;top:383px;width:401px;height:248px">${card(t.ch2c2s, t.ch2c2d)}</div>
    <div class="card" data-reveal style="left:852.5px;top:116px;width:400px;height:272px">${card(t.ch2c3s, t.ch2c3d)}</div>
    <div class="card" data-reveal style="left:852.5px;top:400px;width:400px;height:224px">${card(t.ch2c4s, t.ch2c4d)}</div>
    <div class="card" data-reveal style="left:440.5px;top:574px;width:400px;height:200px">${card(t.ch2c5s, t.ch2c5d)}</div>
  </div>

  <section class="section section--actions">
    <h2 class="h2" data-reveal>${t.actionsTitle}</h2>
    <article class="paper-card" data-reveal>
${step(t.ch2s1t, t.ch2s1b)}${rule}
${step(t.ch2s2t, t.ch2s2b)}${rule}
${step(t.ch2s3t, t.ch2s3b)}${rule}
      <div class="step">
        <h3 class="h3">${t.ch2s4t}</h3>
        <div class="body-16">${t.ch2s4b}</div>
        <figure class="step__figure" style="width:704px"><img loading="lazy" decoding="async" src="${A}img/editor-stats.png" alt="${t.ch2s4Alt}" style="width:704px;height:289.27px"></figure>
      </div>${rule}
${step(t.ch2s5t, t.ch2s5b)}
    </article>
  </section>

  <section class="section section--design">
    <h2 class="h2" data-reveal>${t.designTitle}</h2>

    <article class="feature" style="height:453px" data-reveal>
      <div class="feature__art">
        <div class="blob" style="left:100px;top:121px;width:440px;height:212px;background:var(--green-soft);filter:blur(68px)" data-blob="0.05"></div>
        <div class="pic pic--plain" style="left:71px;top:64px;width:498px;height:325px"><img loading="lazy" decoding="async" src="${A}img/editor-d1-card.png" alt=""></div>
      </div>
      <div class="feature__copy" style="left:629px;top:96px">
        <h3 class="h2">${t.ch2f1t}</h3>
        <div class="body-16">${t.ch2f1b}</div>
      </div>
    </article>

    <article class="feature" style="height:433px" data-reveal>
      <div class="feature__art">
        <div class="pic pic--plain" style="left:520px;top:113px;width:508px;height:208px"><img loading="lazy" decoding="async" src="${A}img/hp-newdesign-5.png" alt=""></div>
      </div>
      <div class="feature__copy" style="left:80px;top:128px">
        <h3 class="h2">${t.ch2f2t}</h3>
        <div class="body-16">${t.ch2f2b}</div>
      </div>
    </article>

    <article class="feature" style="height:629px" data-reveal>
      <div class="feature__art">
        <div class="blob" style="left:121px;top:277px;width:343px;height:172px;background:var(--green-soft);opacity:.8;filter:blur(52px)" data-blob="0.05"></div>
        <div class="pic pic--plain" style="left:30.5px;top:63.75px;width:575px;height:501.5px"><img loading="lazy" decoding="async" src="${A}img/hp-newdesign-6.png" alt=""></div>
      </div>
      <div class="feature__copy" style="left:660px;top:226px">
        <h3 class="h2">${t.ch2f3t}</h3>
        <div class="body-16">${t.ch2f3b}</div>
      </div>
    </article>

    <article class="feature" style="height:473px" data-reveal>
      <div class="feature__art">
        <div class="blob" style="left:549px;top:224px;width:517px;height:54px;background:var(--green-soft);filter:blur(50px)" data-blob="0.05"></div>
        <div class="pic pic--plain" style="left:447.75px;top:63.75px;width:715.5px;height:345.5px"><img loading="lazy" decoding="async" src="${A}img/hp-newdesign-7.png" alt=""></div>
      </div>
      <div class="feature__copy" style="left:80px;top:148px">
        <h3 class="h2">${t.ch2f4t}</h3>
        <div class="body-16">${t.ch2f4b}</div>
      </div>
    </article>

    <article class="feature" style="height:521px" data-reveal>
      <div class="feature__art">
        <div class="blob" style="left:306px;top:148px;width:213px;height:257px;background:var(--green-soft);filter:blur(50px)" data-blob="0.05"></div>
        <div class="pic pic--plain" style="left:39px;top:49px;width:569px;height:423px"><img loading="lazy" decoding="async" src="${A}img/hp-newdesign-8.png" alt=""></div>
      </div>
      <div class="feature__copy" style="left:660px;top:132px">
        <h3 class="h2">${t.ch2f5t}</h3>
        <div class="body-16">${t.ch2f5b}</div>
      </div>
    </article>
  </section>

  <section class="showcase" style="padding:32px 0 64px" data-cap="${t.capEditor}">
    <div class="showcase__blob" style="left:-237px;top:-318px;width:1881px;height:1783px;background:var(--green-glow);filter:blur(148px)" data-blob="0.08"></div>
    <div class="showcase__item" data-reveal>
      <p class="label--lg">${t.ch2sh1}</p>
      <div class="showcase__glass">
        <figure class="showcase__shot" style="height:1062px"><img loading="lazy" decoding="async" src="${A}img/editor-new.png" alt="${t.ch2sh1Alt}"></figure>
      </div>
    </div>
  </section>

  <section class="showcase" style="padding:32px 0 64px">
    <div class="showcase__item" data-reveal>
      <p class="label--lg">${t.ch2sh2}</p>
      <div class="showcase__glass">
        <figure class="showcase__shot" style="height:1088px"><img loading="lazy" decoding="async" src="${A}img/editor-pages.png" alt="${t.ch2sh2Alt}"></figure>
      </div>
    </div>
  </section>

  <section class="section section--result">
    <article class="result-card" data-reveal>
      <p class="eyebrow">${t.resultEyebrow}</p>
${resultItem(t.ch2r1t, t.ch2r1b)}${resultRule}${resultItem(t.ch2r2t, t.ch2r2b)}${resultRule}${resultItem(t.ch2r3t, t.ch2r3b)}
    </article>
  </section>

  <!-- ================= CHAPTER 3 — STYLES ================= -->
  <section class="chapter chapter--styles" id="styles">
    <div class="chapter__blob" data-blob="0.12"></div>
    <h2 class="chapter__title"${track(t.ch3Track)}>${t.ch3Title}</h2>
  </section>

  <div class="collage" style="height:843px">
    <div class="card card--shot card--shot-l" data-reveal style="left:440.5px;top:0;width:400px;height:275px">
      <p class="label">${t.ch3OldStyle}</p>
      <figure class="shot" style="width:376px;height:219px;border-radius:8px">
        <img loading="lazy" decoding="async" src="${A}img/styles-old-style.png" alt="${t.ch3OldStyleAlt}">
      </figure>
    </div>
    <div class="card card--shot card--shot-l" data-reveal style="left:440.5px;top:287px;width:400px;height:268px">
      <p class="label">${t.ch3OldList}</p>
      <figure class="shot" style="width:376px;height:212px;border-radius:8px">
        <img loading="lazy" decoding="async" src="${A}img/old-style-shot.png" alt="${t.ch3OldListAlt}">
      </figure>
    </div>
    <div class="card" data-reveal style="left:27.5px;top:99px;width:401px;height:200px">${card(t.ch3c1s, t.ch3c1d)}</div>
    <div class="card" data-reveal style="left:27.5px;top:311px;width:401px;height:248px">${card(t.ch3c2s, t.ch3c2d)}</div>
    <div class="card" data-reveal style="left:852.5px;top:116px;width:400px;height:224px">${card(t.ch3c3s, t.ch3c3d)}</div>
    <div class="card" data-reveal style="left:852.5px;top:352px;width:400px;height:176px">${card(t.ch3c4s, t.ch3c4d)}</div>
    <div class="card" data-reveal style="left:440.5px;top:567px;width:400px;height:176px">${card(t.ch3c5s, t.ch3c5d)}</div>
  </div>

  <section class="section section--actions">
    <h2 class="h2" data-reveal>${t.actionsTitle}</h2>
    <article class="paper-card" data-reveal>
${step(t.ch3s1t, t.ch3s1b)}${rule}
${step(t.ch3s2t, t.ch3s2b)}${rule}
      <div class="step">
        <h3 class="h3">${t.ch3s3t}</h3>
        <div class="body-16">${t.ch3s3b}</div>
        <div class="step__figures">
          <img loading="lazy" decoding="async" src="${A}img/styles-theme-a.png" alt="" style="left:0;top:0;width:228px;height:183px">
          <img loading="lazy" decoding="async" src="${A}img/styles-theme-b.png" alt="" style="left:236px;top:0;width:226.29px;height:136.39px">
          <img loading="lazy" decoding="async" src="${A}img/styles-props.png" alt="" style="left:470.29px;top:0;width:233.71px;height:183px">
        </div>
      </div>${rule}
${step(t.ch3s4t, t.ch3s4b)}
    </article>
  </section>

  <section class="section section--design">
    <h2 class="h2" data-reveal>${t.designTitle}</h2>

    <article class="feature" style="height:911px" data-reveal>
      <div class="feature__art">
        <div class="blob" style="left:100px;top:349px;width:440px;height:212px;background:var(--pink-soft);filter:blur(68px)" data-blob="0.05"></div>
        <div class="pic pic--plain" style="left:40px;top:64px;width:560px;height:783px"><img loading="lazy" decoding="async" src="${A}img/styles-d1-palette.png" alt=""></div>
      </div>
      <div class="feature__copy" style="left:660px;top:96px">
        <h3 class="h2">${t.ch3f1t}</h3>
        <div class="body-16">${t.ch3f1b}</div>
      </div>
    </article>

    <article class="feature" style="height:453px" data-reveal>
      <div class="feature__art">
        <div class="pic pic--plain" style="left:535px;top:42.25px;width:529px;height:368.5px"><img loading="lazy" decoding="async" src="${A}img/hp-newdesign-9.png" alt=""></div>
      </div>
      <div class="feature__copy" style="left:80px;top:138px">
        <h3 class="h2">${t.ch3f2t}</h3>
        <div class="body-16">${t.ch3f2b}</div>
      </div>
    </article>

    <article class="feature" style="height:773px" data-reveal>
      <div class="feature__art">
        <div class="pic pic--plain" style="left:100px;top:64px;width:440px;height:645px"><img loading="lazy" decoding="async" src="${A}img/styles-d3-states.png" alt=""></div>
      </div>
      <div class="feature__copy" style="left:600px;top:112px">
        <h3 class="h2">${t.ch3f3t}</h3>
        <div class="body-16">${t.ch3f3b}</div>
      </div>
    </article>

    <article class="feature" style="height:433px" data-reveal>
      <div class="feature__art">
        <div class="pic pic--plain" style="left:566.5px;top:53.5px;width:479px;height:326px"><img loading="lazy" decoding="async" src="${A}img/hp-newdesign-10.png" alt=""></div>
      </div>
      <div class="feature__copy" style="left:80px;top:128px">
        <h3 class="h2">${t.ch3f4t}</h3>
        <div class="body-16">${t.ch3f4b}</div>
      </div>
    </article>

    <div class="feature-row" data-reveal-stagger>
      <article class="feature" style="width:546px;height:302px">
        <div class="feature__copy" style="left:64px;top:64px;width:418px">
          <h3 class="h2">${t.ch3f5t}</h3>
          <div class="body-16">${t.ch3f5b}</div>
        </div>
      </article>
      <article class="feature" style="width:546px;height:302px">
        <div class="feature__copy" style="left:64px;top:64px;width:418px">
          <h3 class="h2">${t.ch3f6t}</h3>
          <div class="body-16">${t.ch3f6b}</div>
        </div>
      </article>
    </div>

    <article class="feature feature--spec" style="height:1125px" data-reveal>
      <div class="feature__copy" style="left:200px;top:112px;width:712px;align-items:center">
        <h3 class="h2" style="text-align:center;width:100%">${t.ch3f7t}</h3>
        <div class="body-16" style="text-align:center">${t.ch3f7b}</div>
      </div>
      <div class="feature__art">
        <div class="pic" style="left:40px;top:290px;width:1040px;height:771.37px;border-radius:8px;background:var(--tint)">
          <img loading="lazy" decoding="async" src="${A}img/styles-spec.png" alt="" style="width:1016px;height:747.37px;margin:12px 0 0 12px">
        </div>
      </div>
    </article>
  </section>

  <section class="showcase" style="padding:32px 0 64px" data-cap="${t.capStyles}">
    <div class="showcase__blob" style="left:-51px;top:-183px;width:1382px;height:1209px;background:var(--pink-glow);filter:blur(148px)" data-blob="0.08"></div>
    <div class="showcase__item" data-reveal>
      <p class="label--lg">${t.ch3sh1}</p>
      <div class="showcase__glass showcase__glass--bright">
        <figure class="showcase__shot" style="height:658px"><img loading="lazy" decoding="async" src="${A}img/styles-new-a.png" alt="${t.ch3sh1Alt}"></figure>
      </div>
    </div>
  </section>

  <section class="showcase" style="padding:32px 0 64px">
    <div class="showcase__blob" style="left:4px;top:118px;width:1260px;height:1259px;background:var(--pink-glow);filter:blur(148px)" data-blob="0.08"></div>
    <div class="showcase__item" data-reveal>
      <p class="label--lg">${t.ch3sh2}</p>
      <div class="showcase__glass">
        <figure class="showcase__shot" style="height:1236px"><img loading="lazy" decoding="async" src="${A}img/styles-new-b.png" alt="${t.ch3sh2Alt}"></figure>
      </div>
    </div>
  </section>

  <section class="section section--result" style="padding-bottom:16px">
    <article class="result-card" data-reveal>
      <p class="eyebrow">${t.resultEyebrow}</p>
${resultItem(t.ch3r1t, t.ch3r1b)}${resultRule}${resultItem(t.ch3r2t, t.ch3r2b)}
    </article>
  </section>

  <footer class="footer">
    <p><a href="#top">${t.footerName}</a> — ${t.footerYears}</p>
    <p class="footer__links">
      <a href="${RESUME}" target="_blank" rel="noopener">${t.resume}</a>
      <a href="${MAIL}">${t.email}</a>
      <a href="${LINKEDIN}" target="_blank" rel="noopener">linkedin</a>
    </p>
  </footer>

</main>

<nav class="dock" aria-label="${t.navCap}">
  <a href="#homepage" data-nav="homepage">${t.navHome}</a>
  <a href="#editor" data-nav="editor">${t.navEditor}</a>
  <a href="#styles" data-nav="styles">${t.navStyles}</a>
  <a class="dock__cta" href="${MAIL}">${t.dockEmail}</a>
</nav>

<script src="${A === 'assets/' ? 'js' : '../js'}/main.js?v=8"></script>
</body>
</html>
`;
}

/* --------------------------------------------------------------------------- */
const langEN = '<a href="#" class="is-current" aria-current="true" hreflang="en">EN</a><a href="ru/" hreflang="ru">RU</a>';
const langRU = '<a href="../" hreflang="en">EN</a><a href="#" class="is-current" aria-current="true" hreflang="ru">RU</a>';

mkdirSync(new URL('./ru/', import.meta.url), { recursive: true });
writeFileSync(new URL('./index.html', import.meta.url), render(en, { A: 'assets/', langNav: langEN }));
writeFileSync(new URL('./ru/index.html', import.meta.url), render(ru, { A: '../assets/', langNav: langRU }));
console.log('built: index.html, ru/index.html');
