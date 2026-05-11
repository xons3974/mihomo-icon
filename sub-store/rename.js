const inArg = $arguments;
const nx = inArg.nx || false,
  bl = inArg.bl || false,
  nf = inArg.nf || false,
  key = inArg.key || false,
  blgd = inArg.blgd || false,
  blpx = inArg.blpx || false,
  blnx = inArg.blnx || false,
  numone = inArg.one || false,
  clear = inArg.clear || false,
  addflag = (inArg.flag !== 'false'), // 只要不手动设为 false，默认就加旗帜
  nm = inArg.nm || false;

const FGF = inArg.fgf == undefined ? " " : decodeURI(inArg.fgf),
  XHFGF = inArg.sn == undefined ? " " : decodeURI(inArg.sn),
  FNAME = inArg.name == undefined ? "" : decodeURI(inArg.name),
  BLKEY = inArg.blkey == undefined ? "" : decodeURI(inArg.blkey);

// 全量基础数据
const FG = ['🇭🇰','🇲🇴','🇹🇼','🇯🇵','🇰🇷','🇸🇬','🇺🇸','🇬🇧','🇫🇷','🇩🇪','🇦🇺','🇦🇪','🇦🇫','🇦🇱','🇩🇿','🇦🇴','🇦🇷','🇦🇲','🇦🇹','🇦🇿','🇧🇭','🇧🇩','🇧🇾','🇧🇪','🇧🇿','🇧🇯','🇧🇹','🇧🇴','🇧🇦','🇧🇼','🇧🇷','🇻🇬','🇧🇳','🇧🇬','🇧🇫','🇧🇮','🇰🇭','🇨🇲','🇨🇦','🇨🇻','🇰🇾','🇨🇫','🇹🇩','🇨🇱','🇨🇴','🇰🇲','🇨🇬','🇨🇩','🇨🇷','🇭🇷','🇨🇾','🇨🇿','🇩🇰','🇩🇯','🇩🇴','🇪🇨','🇪🇬','🇸🇻','🇬🇶','🇪🇷','🇪🇪','🇪🇹','🇫🇯','🇫🇮','🇬🇦','🇬🇲','🇬🇪','🇬🇭','🇬🇷','🇬🇱','🇬🇹','🇬🇳','🇬🇾','🇭🇹','🇭🇳','🇭🇺','🇮🇸','🇮🇳','🇮🇩','🇮🇷','🇮🇶','🇮🇪','🇮🇲','🇮🇱','🇮🇹','🇨🇮','🇯🇲','🇯🇴','🇰🇿','🇰🇪','🇰🇼','🇰🇬','🇱🇦','🇱🇻','🇱🇧','🇱🇸','🇱🇷','🇱🇾','🇱🇹','🇱🇺','🇲🇰','🇲🇬','🇲🇼','🇲🇾','🇲🇲','🇲🇱','🇲🇹','🇲🇷','🇲🇺','🇲🇽','🇲🇩','🇲🇨','🇲🇳','🇲🇪','🇲🇦','🇲🇿','🇲🇲','🇳🇦','🇳🇵','🇳🇱','🇳🇿','🇳🇮','🇳🇪','🇳🇬','🇰🇵','🇳🇴','🇴🇲','🇵🇰','🇵🇦','🇵🇾','🇵🇪','🇵🇭','🇵🇹','🇵🇷','🇶🇦','🇷🇴','🇷🇺','🇷🇼','🇸🇲','🇸🇦','🇸🇳','🇷🇸','🇸🇱','🇸🇰','🇸🇮','🇸🇴','🇿🇦','🇪🇸','🇱🇰','🇸🇩','🇸🇷','🇸🇿','🇸🇪','🇨🇭','🇸🇾','🇹🇯','🇹🇿','🇹🇭','🇹🇬','🇹🇴','🇹🇹','🇹🇳','🇹🇷','🇹🇲','🇻🇮','🇺🇬','🇺🇦','🇺🇾','🇺🇿','🇻🇪','🇻🇳','🇾🇪','🇿🇲','🇿🇼','🇦🇩','🇷🇪','🇵🇱','🇬🇺','🇻🇦','🇱🇮','🇨🇼','🇸🇨','🇦🇶','🇬🇮','🇨🇺','🇫🇴','🇦🇽','🇧🇲','🇹🇱','🇸🇧'];
const EN = ['HK','MO','TW','JP','KR','SG','US','GB','FR','DE','AU','AE','AF','AL','DZ','AO','AR','AM','AT','AZ','BH','BD','BY','BE','BZ','BJ','BT','BO','BA','BW','BR','VG','BN','BG','BF','BI','KH','CM','CA','CV','KY','CF','TD','CL','CO','KM','CG','CD','CR','HR','CY','CZ','DK','DJ','DO','EC','EG','SV','GQ','ER','EE','ET','FJ','FI','GA','GM','GE','GH','GR','GL','GT','GN','GY','HT','HN','HU','IS','IN','ID','IR','IQ','IE','IM','IL','IT','CI','JM','JO','KZ','KE','KW','KG','LA','LV','LB','LS','LR','LY','LT','LU','MK','MG','MW','MY','MV','ML','MT','MR','MU','MX','MD','MC','MN','ME','MA','MZ','MM','NA','NP','NL','NZ','NI','NE','NG','KP','NO','OM','PK','PA','PY','PE','PH','PT','PR','QA','RO','RU','RW','SM','SA','SN','RS','SL','SK','SI','SO','ZA','ES','LK','SD','SR','SZ','SE','CH','SY','TJ','TZ','TH','TG','TO','TT','TN','TR','TM','VI','UG','UA','UY','UZ','VE','VN','YE','ZM','ZW','AD','RE','PL','GU','VA','LI','CW','SC','AQ','GI','CU','FO','AX','BM','TL','SB'];
const ZH = ['香港','澳门','台湾','日本','韩国','新加坡','美国','英国','法国','德国','澳大利亚','阿联酋','阿富汗','阿尔巴尼亚','阿尔及利亚','安哥拉','阿根廷','亚美尼亚','奥地利','阿塞拜疆','巴林','孟加拉国','白俄罗斯','比利时','伯利兹','贝宁','不丹','玻利维亚','波斯尼亚和黑塞哥维那','博茨瓦纳','巴西','英属维京群岛','文莱','保加利亚','布基纳法索','布隆迪','柬埔寨','喀麦隆','加拿大','佛得角','开曼群岛','中非共和国','乍得','智利','哥伦比亚','科摩罗','刚果(布)','刚果(金)','哥斯达黎加','克罗地亚','塞浦路斯','捷克','丹麦','吉布提','多米尼加共和国','厄瓜多尔','埃及','萨尔瓦多','赤道几内亚','厄立特里亚','爱沙尼亚','埃塞俄比亚','斐济','芬兰','加蓬','冈比亚','格鲁吉亚','加纳','希腊','格陵兰','危地马拉','几内亚','圭亚那','海地','洪都拉斯','匈牙利','冰岛','印度','印尼','伊朗','伊拉克','爱尔兰','马恩岛','以色列','意大利','科特迪瓦','牙买加','约旦','哈萨克斯坦','肯尼亚','科威特','吉尔吉斯斯坦','老挝','拉脱维亚','黎巴嫩','莱索托','利比里亚','利比亚','立陶宛','卢森堡','马其顿','马达加斯加','马拉维','马来','马尔代夫','马里','马耳他','毛利塔尼亚','毛里求斯','墨西哥','摩尔多瓦','摩纳哥','蒙古','黑山共和国','摩洛哥','莫桑比克','缅甸','纳米比亚','尼泊尔','荷兰','新西兰','尼加拉瓜','尼日尔','尼日利亚','朝鲜','挪威','阿曼','巴基斯坦','巴拿马','巴拉圭','秘鲁','菲律宾','葡萄牙','波多黎各','卡塔尔','罗马尼亚','俄罗斯','卢旺达','圣马力诺','沙特阿拉伯','塞内加尔','塞尔维亚','塞拉利昂','斯洛伐克','斯洛文尼亚','索马里','南非','西班牙','斯里兰卡','苏丹','苏里南','斯威士兰','瑞典','瑞士','叙利亚','塔吉克斯坦','坦桑尼亚','泰国','多哥','汤加','特立尼达和多巴哥','突尼斯','土耳其','土库曼斯坦','美属维尔京群岛','乌干达','乌克兰','乌拉圭','乌兹别克斯坦','委内瑞拉','越南','也门','赞比亚','津巴布韦','安道尔','留尼汪','波兰','关岛','梵蒂冈','列支敦士登','库拉索','塞舌尔','南极','直布罗陀','古巴','法罗群岛','奥兰群岛','百慕达','东帝汶','所罗门群岛'];
const QC = ['Hong Kong','Macao','Taiwan','Japan','Korea','Singapore','United States','United Kingdom','France','Germany','Australia','Dubai','Afghanistan','Albania','Algeria','Angola','Argentina','Armenia','Austria','Azerbaijan','Bahrain','Bangladesh','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','British Virgin Islands','Brunei','Bulgaria','Burkina-faso','Burundi','Cambodia','Cameroon','Canada','CapeVerde','CaymanIslands','Central African Republic','Chad','Chile','Colombia','Comoros','Congo-Brazzaville','Congo-Kinshasa','CostaRica','Croatia','Cyprus','Czech Republic','Denmark','Djibouti','Dominican Republic','Ecuador','Egypt','EISalvador','Equatorial Guinea','Eritrea','Estonia','Ethiopia','Fiji','Finland','Gabon','Gambia','Georgia','Ghana','Greece','Greenland','Guatemala','Guinea','Guyana','Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Isle of Man','Israel','Italy','Ivory Coast','Jamaica','Jordan','Kazakstan','Kenya','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Lithuania','Luxembourg','Macedonia','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Mauritania','Mauritius','Mexico','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar(Burma)','Namibia','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','NorthKorea','Norway','Oman','Pakistan','Panama','Paraguay','Peru','Philippines','Portugal','PuertoRico','Qatar','Romania','Russia','Rwanda','SanMarino','SaudiArabia','Senegal','Serbia','SierraLeone','Slovakia','Slovenia','Somalia','SouthAfrica','Spain','SriLanka','Sudan','Suriname','Swaziland','Sweden','Switzerland','Syria','Tajikstan','Tanzania','Thailand','Togo','Tonga','TrinidadandTobago','Tunisia','Turkey','Turkmenistan','U.S.Virgin Islands','Uganda','Ukraine','Uruguay','Uzbekistan','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe','Andorra','Reunion','Poland','Guam','Vatican','Liechtensteins','Curacao','Seychelles','Antarctica','Gibraltar','Cuba','Faroe Islands','Ahvenanmaa','Bermuda','Timor-Leste','Solomon Islands'];

// 构造统一查找表，确保索引 100% 对齐
const UnifiedData = EN.map((code, i) => ({
  code: code,
  flag: FG[i],
  keywords: [EN[i], ZH[i], QC[i], FG[i]]
}));

// ─── 补充：中国大陆节点支持（CN 不在标准 ISO 列表中，单独处理）───
const CN_ENTRY = { code: 'CN', flag: '🇨🇳', keywords: ['CN', '中国', '大陆', '广东', '广西', '北京', '上海', '深圳', '成都', '杭州', 'China', 'Mainland'] };

// ─── extraMap：节点服务商常用别名 → ISO 代码 ───
const extraMap = {
  "SIN":   "SG",
  "UK":    "GB",
  "USA":   "US",
  "INDIA": "IN",
};

// ─── cityMap：常见城市名/别名 → ISO 代码 ───
// zhKeys 用 includes 子串匹配；enKeys 用词边界正则，避免 'LA' 命中 'Cloudflared' 等误匹配
const cityMap = [
  // 美国城市
  { zhKeys: ['拉斯维加斯'],       enKeys: ['Las Vegas', 'LasVegas'],      code: 'US' },
  { zhKeys: ['阿什本'],           enKeys: ['Ashburn'],                    code: 'US' },
  { zhKeys: ['洛杉矶'],           enKeys: ['Los Angeles', 'LosAngeles'],  code: 'US' },
  { zhKeys: ['纽约'],             enKeys: ['New York', 'NewYork', 'NYC'], code: 'US' },
  { zhKeys: ['西雅图'],           enKeys: ['Seattle'],                    code: 'US' },
  { zhKeys: ['芝加哥'],           enKeys: ['Chicago'],                    code: 'US' },
  { zhKeys: ['达拉斯'],           enKeys: ['Dallas'],                     code: 'US' },
  { zhKeys: ['圣何塞'],           enKeys: ['San Jose', 'SanJose'],        code: 'US' },
  { zhKeys: ['硅谷'],             enKeys: ['Silicon Valley'],             code: 'US' },
  { zhKeys: ['迈阿密'],           enKeys: ['Miami'],                      code: 'US' },
  { zhKeys: ['波特兰'],           enKeys: ['Portland'],                   code: 'US' },
  { zhKeys: ['弗里蒙特'],         enKeys: ['Fremont'],                    code: 'US' },
  // 香港
  { zhKeys: ['香港'],             enKeys: ['Hong Kong', 'HongKong'],      code: 'HK' },
  // 日本
  { zhKeys: ['东京'],             enKeys: ['Tokyo'],                      code: 'JP' },
  { zhKeys: ['大阪'],             enKeys: ['Osaka'],                      code: 'JP' },
  // 新加坡
  { zhKeys: ['新加坡'],           enKeys: ['Singapore'],                  code: 'SG' },
  // 台湾
  { zhKeys: ['台北'],             enKeys: ['Taipei'],                     code: 'TW' },
  // 英国
  { zhKeys: ['伦敦'],             enKeys: ['London'],                     code: 'GB' },
  // 德国
  { zhKeys: ['法兰克福'],         enKeys: ['Frankfurt'],                  code: 'DE' },
  // 荷兰
  { zhKeys: ['阿姆斯特丹'],       enKeys: ['Amsterdam'],                  code: 'NL' },
  // 法国
  { zhKeys: ['巴黎'],             enKeys: ['Paris'],                      code: 'FR' },
  // 俄罗斯
  { zhKeys: ['莫斯科'],           enKeys: ['Moscow'],                     code: 'RU' },
  // 澳大利亚（含「澳洲」口语别名）
  { zhKeys: ['悉尼', '澳洲'],     enKeys: ['Sydney'],                     code: 'AU' },
  { zhKeys: ['墨尔本'],           enKeys: ['Melbourne'],                  code: 'AU' },
  // 韩国
  { zhKeys: ['首尔'],             enKeys: ['Seoul'],                      code: 'KR' },
  // 印度
  { zhKeys: ['孟买'],             enKeys: ['Mumbai'],                     code: 'IN' },
];

// ─── 预过滤：移除会造成误识别的无关模式 ───
function sanitizeName(name) {
  // 1. 移除 "LV+数字" 等级编号，防止 LV 被识别为拉脱维亚
  name = name.replace(/(?<![A-Za-z])LV\s*\d+(?!\s*[A-Za-z])/gi, '__LEVEL__');

  // 2. 移除存储/流量单位（如 59.49 GB、100MB、1TB），防止 GB 被识别为英国
  //    匹配形式：数字 + 可选空格 + 单位（GB/MB/TB/KB/PB/Mbps/Kbps/Gbps）
  name = name.replace(/[\d.]+\s*(?:GB|MB|TB|KB|PB|Mbps|Kbps|Gbps)\b/gi, '__SIZE__');

  return name;
}

const regexArray = [/ˣ²/, /ˣ³/, /ˣ⁴/, /ˣ⁵/, /ˣ⁶/, /ˣ⁷/, /ˣ⁸/, /ˣ⁹/, /ˣ¹⁰/, /ˣ²⁰/, /ˣ³⁰/, /ˣ⁴⁰/, /ˣ⁵⁰/, /IPLC/i, /IEPL/i, /核心/, /边缘/, /高级/, /标准/, /实验/, /商宽/, /家宽/, /游戏|game/i, /专线/, /LB/];
const valueArray = ["2×", "3×", "4×", "5×", "6×", "7×", "8×", "9×", "10×", "20×", "30×", "40×", "50×", "IPLC", "IEPL", "Kern", "Edge", "Pro", "Std", "Exp", "Biz", "Fam", "Game", "Zx", "LB"];

function operator(pro) {
  pro.forEach((e) => {
    let name = e.name;
    let matchedCountry = null;

    // 1. 特殊映射预处理（如 SIN -> SG）
    for (let alias in extraMap) {
      if (new RegExp("\\b" + alias + "\\b", "i").test(name)) {
        name = name.replace(new RegExp("\\b" + alias + "\\b", "gi"), extraMap[alias]);
      }
    }

    // 2. 预处理：去除会误匹配的模式（LV+数字等级、存储单位GB等）
    let nameForMatch = sanitizeName(name);

    // 3. 核心匹配查找（多级优先级）
    matchedCountry = findCountry(nameForMatch);

    if (matchedCountry) {
      // 3. 识别标签和倍率（从原始名称中提取，不用 nameForMatch）
      let ikey = "", ikeys = "";
      regexArray.forEach((r, i) => { if (r.test(e.name)) ikeys = valueArray[i]; });
      if (bl) {
        const m = e.name.match(/((倍率|X|x|×)\D?((\d{1,3}\.)?\d+)\D?)|((\d{1,3}\.)?\d+)(倍|X|x|×)/);
        if (m) {
          const rev = m[0].match(/(\d[\d.]*)/)[0];
          if (rev !== "1") ikey = rev + "×";
        }
      }

      // 4. 组装结果
      let finalParts = [];
      if (addflag) finalParts.push(matchedCountry.flag);
      if (FNAME) finalParts.push(FNAME);
      finalParts.push(matchedCountry.code);
      if (ikeys) finalParts.push(ikeys);
      if (ikey) finalParts.push(ikey);

      e.name = finalParts.filter(p => p !== "").join(FGF);
    } else {
      // 没匹配上：nm 参数决定保留原名还是删除
      if (!nm) e.name = null;
    }
  });

  // 清洗列表并去重
  pro = pro.filter(e => e.name !== null);
  jxh(pro);
  if (numone) oneP(pro);
  if (blpx) pro.sort((a, b) => a.name.localeCompare(b.name));

  return pro;
}

// ─── 多级国家匹配函数 ───
function findCountry(name) {
  const nameLower = name.toLowerCase();

  // 优先级0：城市名/别名映射
  // zhKeys 直接中文子串匹配；enKeys 加词边界，防止 'la' 误命中 'Cloudflared'
  for (const city of cityMap) {
    for (const kw of (city.zhKeys || [])) {
      if (name.includes(kw)) {
        const entry = UnifiedData.find(d => d.code === city.code);
        if (entry) return entry;
      }
    }
    for (const kw of (city.enKeys || [])) {
      const esc = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (new RegExp('(?<![A-Za-z])' + esc + '(?![A-Za-z])', 'i').test(name)) {
        const entry = UnifiedData.find(d => d.code === city.code);
        if (entry) return entry;
      }
    }
  }

  // 优先级1：中国大陆关键词（CN、广东、大陆等）
  for (const kw of CN_ENTRY.keywords) {
    // CN 代码匹配需要词边界保护
    if (kw === 'CN') {
      if (/(?<![A-Za-z])CN(?![A-Za-z])/i.test(name)) return CN_ENTRY;
    } else {
      if (name.includes(kw)) return CN_ENTRY;
    }
  }

  // 优先级2：中文国家名匹配（ZH，最精确）
  let match = UnifiedData.find(item => {
    return item.keywords[1] && name.includes(item.keywords[1]);
  });
  if (match) return match;

  // 优先级3：英文全称匹配（QC，如 "Hong Kong"、"Singapore"）
  match = UnifiedData.find(item => {
    return item.keywords[2] && nameLower.includes(item.keywords[2].toLowerCase());
  });
  if (match) return match;

  // 优先级4：代码+数字/符号连写（如 HK1、DE4、HK-1）
  // \b 在字母+数字边界失效，需要用 lookahead/lookbehind 替代
  match = UnifiedData.find(item => {
    const p = new RegExp('(?<![A-Za-z])' + item.code + '(?=\\d|[-_]\\d|[-_]|$|[^A-Za-z])', 'i');
    return p.test(name);
  });
  if (match) return match;

  // 优先级5：严格代码匹配（前后均为非字母）
  match = UnifiedData.find(item => {
    return new RegExp('(?<![A-Za-z])' + item.code + '(?![A-Za-z])', 'i').test(name);
  });
  return match || null;
}

// ─── 辅助函数 ───
function jxh(e) {
  const n = e.reduce((e, n) => {
    const t = e.find((e) => e.name === n.name);
    if (t) {
      t.count++;
      t.items.push({ ...n, name: `${n.name}${XHFGF}${t.count.toString().padStart(2, "0")}` });
    } else {
      e.push({ name: n.name, count: 1, items: [{ ...n, name: `${n.name}${XHFGF}01` }] });
    }
    return e;
  }, []);
  const t = n.flatMap(e => e.items);
  e.splice(0, e.length, ...t);
  return e;
}

function oneP(e) {
  const t = e.reduce((e, t) => {
    const n = t.name.replace(/[^A-Za-z0-9\u00C0-\u017F\u4E00-\u9FFF]+\d+$/, "");
    if (!e[n]) { e[n] = []; }
    e[n].push(t);
    return e;
  }, {});
  for (const e in t) {
    if (t[e].length === 1 && t[e][0].name.endsWith("01")) {
      t[e][0].name = t[e][0].name.replace(/[^.]01/, "");
    }
  }
  return e;
}
