// 雨夜迷局 - 角色档案

const characters = {
    chenHao: {
        id: 'chenHao',
        name: '陈浩',
        role: '侦探（玩家）',
        age: 42,
        description: '经验丰富的刑警队长，从警20年。以敏锐的观察力和缜密的逻辑思维著称，破获过无数疑难案件，深受同事敬重。',
        background: '从基层民警做起，凭借出色的侦查能力一步步晋升。以永不放弃的精神闻名，无论多复杂的案件都会追查到底。',
        unlocked: true
    },
    
    linZhiyuan: {
        id: 'linZhiyuan',
        name: '林志远',
        role: '受害者',
        age: 48,
        description: '本市知名艺术品收藏家和古董商人，"雅韵轩"古董店店主。单身，富有，收藏品的来源有些可疑，据传涉及走私。',
        background: '通过艺术品交易积累了二十年的财富。眼光独到，善于发现珍品，但据传涉及走私。在艺术圈人际关系复杂。',
        unlocked: true,
        isVictim: true
    },
    
    suXiaoyu: {
        id: 'suXiaoyu',
        name: '苏晓雨',
        role: '私人助理 / 第一发现人',
        age: 26,
        description: '林志远的私人助理，工作三年，负责日常事务和艺术品交易。凌晨2:30发现尸体，声称回来取遗忘的合同。',
        background: '出身普通家庭。林待她如家人，但近来变得占有欲强，在她拒绝其求爱后威胁要解雇她。',
        motive: '担心工作和行业前途。林威胁如果不做他女朋友就要在业内封杀她。',
        unlocked: false,
        suspicion: 0
    },
    
    linXiaoya: {
        id: 'linXiaoya',
        name: '林小雅',
        role: '外甥女',
        age: 22,
        description: '林志远的外甥女，妹妹林雅芳的女儿。美术学院学生。声称凌晨1:03接到舅舅的电话。',
        background: '靠舅舅资助学画。保险箱上发现了她的指纹。声称舅舅告诉她如果出事就去找"老陈"。',
        motive: '不明，但保险箱上的指纹和神秘电话令人怀疑。可能知道舅舅遗嘱的事。',
        unlocked: false,
        suspicion: 0
    },
    
    zhaoMinghua: {
        id: 'zhaoMinghua',
        name: '赵明华',
        role: '古董商',
        age: 45,
        description: '"古韵堂"古董店店主。林志远的商业伙伴和朋友。案发当晚参加了聚会。',
        background: '认识林十多年。商业关系既有合作也有竞争。晚上10:30离开聚会。',
        motive: '商业竞争？对那幅珍贵的明代名画的了解？',
        unlocked: false,
        suspicion: 0
    },
    
    liMeiling: {
        id: 'liMeiling',
        name: '李美玲',
        role: '画廊老板 / 前女友',
        age: 38,
        description: '"雅致轩"画廊老板。林志远的前女友（三年前分手）。参加了聚会，晚上11:10离开。',
        background: '成功的画廊老板，但有个秘密——她一直在伪造艺术品鉴定证书。林发现了这一点并威胁要曝光，除非她复合。',
        motive: '为了保护自己的事业和名声。晚上10:42与林有过3分钟的激烈通话。',
        unlocked: false,
        suspicion: 0
    },
    
    zhangProfessor: {
        id: 'zhangProfessor',
        name: '张文博教授',
        role: '艺术评论家',
        age: 58,
        description: '美术学院资深教授。明代绘画专家，研究30余年。参加了聚会。',
        background: '艺术界德高望重。一眼就认出那幅失踪的明代名画的价值。暗示画的来源可能有问题。',
        motive: '不明，但他的专业知识让他能接触到珍贵的艺术品信息。独居，没有不在场证明。',
        unlocked: false,
        suspicion: 0
    },
    
    wangDahai: {
        id: 'wangDahai',
        name: '王大海',
        role: '保安队长',
        age: 50,
        description: '"翡翠湾"公寓楼保安队长。苏晓雨尖叫后第一个赶到现场。',
        background: '在楼里工作8年。熟悉住户。声称当晚没有陌生人进入大楼。',
        motive: '表面上看没有，但能进入大楼所有区域。',
        unlocked: false,
        suspicion: 0
    },
    
    laoChen: {
        id: 'laoChen',
        name: '老陈',
        role: '神秘联系人',
        age: '不明',
        description: '林志远在最后打给外甥女的电话中提到的神秘人物。身份不明。',
        background: '不明。林告诉外甥女如果出事就去找这个人。',
        motive: '不明',
        unlocked: false,
        suspicion: 0
    }
};

// 证据物品
const evidence = {
    body: {
        id: 'body',
        name: '受害者遗体',
        description: '林志远被发现死在客厅。死因：头部遭受钝器重击。死亡时间：凌晨12:30至1:00之间。',
        discovered: false,
        category: '犯罪现场'
    },
    
    bronzeFragments: {
        id: 'bronzeFragments',
        name: '青铜碎片',
        description: '在受害者伤口中发现的金属碎片。分析证实是青铜材质，可能来自某件古董。',
        discovered: false,
        category: '法医证据'
    },
    
    incenseBurner: {
        id: 'incenseBurner',
        name: '青铜香炉',
        description: '明代青铜香炉，底部发现微量血迹。一角有轻微变形痕迹。很可能是凶器。',
        discovered: false,
        category: '犯罪现场'
    },
    
    openWindow: {
        id: 'openWindow',
        name: '敞开的落地窗',
        description: '客厅的落地窗被发现开着。雨水打湿了地板。阳台栏杆上有绳索摩擦痕迹。',
        discovered: false,
        category: '犯罪现场'
    },
    
    missingPainting: {
        id: 'missingPainting',
        name: '失踪的明代名画',
        description: '沈石田创作的明代山水画，价值至少500万元，从打开的保险箱中失踪。',
        discovered: false,
        category: '犯罪现场'
    },
    
    safeFingerprint: {
        id: 'safeFingerprint',
        name: '保险箱指纹',
        description: '在保险箱上发现的部分指纹属于受害者的外甥女林小雅。',
        discovered: false,
        category: '法医证据'
    },
    
    phoneCall103: {
        id: 'phoneCall103',
        name: '凌晨1:03的电话',
        description: '凌晨1:03从林的手机打给外甥女的电话，持续2分35秒。如果林已死亡，那么是别人打的这个电话。',
        discovered: false,
        category: '时间线'
    },
    
    phoneCall1042: {
        id: 'phoneCall1042',
        name: '晚上10:42的电话',
        description: '晚上10:42林给李美玲打了3分钟电话。他发现了她的伪造勾当并以此要挟她。',
        discovered: false,
        category: '时间线'
    },
    
    will: {
        id: 'will',
        name: '修改后的遗嘱',
        description: '林最近修改了遗嘱，将大量资产留给苏晓雨。这给了她强烈的金钱动机。',
        discovered: false,
        category: '动机'
    },
    
    wetClothes: {
        id: 'wetClothes',
        name: '苏晓雨的湿衣服',
        description: '苏晓雨"发现"尸体时穿着湿衣服，声称是被雨淋湿的。但时间线对不上。',
        discovered: false,
        category: '可疑'
    },
    
    ropeMarks: {
        id: 'ropeMarks',
        name: '栏杆上的绳索痕迹',
        description: '阳台栏杆上的摩擦痕迹表明有人用绳索从23楼下降——或者是为了制造这种假象。',
        discovered: false,
        category: '犯罪现场'
    },
    
    forgeryEvidence: {
        id: 'forgeryEvidence',
        name: '伪造勾当',
        description: '李美玲一直在伪造艺术品鉴定证书。林发现了这一点并以此来要挟她复合。',
        discovered: false,
        category: '动机'
    },
    
    paintingOrigin: {
        id: 'paintingOrigin',
        name: '名画来源',
        description: '张教授怀疑失踪名画的来源可能有问题。可能是多年前从私人收藏中偷来的。',
        discovered: false,
        category: '动机'
    },
    
    laoChenMystery: {
        id: 'laoChenMystery',
        name: '"老陈"之谜',
        description: '林告诉外甥女如果出事就去找"老陈"。这个人的身份可能是理解案件的关键。',
        discovered: false,
        category: '谜团'
    }
};

// 导出供其他文件使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { characters, evidence };
}
