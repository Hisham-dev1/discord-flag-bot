const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const unzipper = require("unzipper");

const zipPath = "./flag-cards.zip";
const extractPath = "./flag-cards";

if (!fs.existsSync(extractPath)) {
  fs.createReadStream(zipPath)
    .pipe(unzipper.Extract({ path: extractPath }))
    .on("close", () => {
      console.log("Images extracted successfully");
    });
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

// قائمة الدول مع مسارات أعلامها من flag-cards
const countries = [
    // الدول العربية
    { name: 'السعودية', flag: './flag-cards/sa.png', alternatives: ['saudi arabia', 'سعودية', 'المملكة'] },
    { name: 'الإمارات', flag: './flag-cards/ae.png', alternatives: ['uae', 'emirates', 'امارات'] },
    { name: 'مصر', flag: './flag-cards/eg.png', alternatives: ['egypt', 'مصر'] },
    { name: 'الكويت', flag: './flag-cards/kw.png', alternatives: ['kuwait', 'كويت'] },
    { name: 'قطر', flag: './flag-cards/qa.png', alternatives: ['qatar', 'قطر'] },
    { name: 'البحرين', flag: './flag-cards/bh.png', alternatives: ['bahrain', 'بحرين'] },
    { name: 'عمان', flag: './flag-cards/om.png', alternatives: ['oman', 'عمان'] },
    { name: 'الأردن', flag: './flag-cards/jo.png', alternatives: ['jordan', 'اردن'] },
    { name: 'العراق', flag: './flag-cards/iq.png', alternatives: ['iraq', 'عراق'] },
    { name: 'سوريا', flag: './flag-cards/sy.png', alternatives: ['syria', 'سوريا'] },
    { name: 'لبنان', flag: './flag-cards/lb.png', alternatives: ['lebanon', 'لبنان'] },
    { name: 'فلسطين', flag: './flag-cards/ps.png', alternatives: ['palestine', 'فلسطين'] },
    { name: 'المغرب', flag: './flag-cards/ma.png', alternatives: ['morocco', 'مغرب'] },
    { name: 'الجزائر', flag: './flag-cards/dz.png', alternatives: ['algeria', 'جزائر'] },
    { name: 'تونس', flag: './flag-cards/tn.png', alternatives: ['tunisia', 'تونس'] },
    { name: 'ليبيا', flag: './flag-cards/ly.png', alternatives: ['libya', 'ليبيا'] },
    { name: 'السودان', flag: './flag-cards/sd.png', alternatives: ['sudan', 'سودان'] },
    { name: 'اليمن', flag: './flag-cards/ye.png', alternatives: ['yemen', 'يمن'] },
    { name: 'الصومال', flag: './flag-cards/so.png', alternatives: ['somalia', 'صومال'] },
    { name: 'موريتانيا', flag: './flag-cards/mr.png', alternatives: ['mauritania', 'موريتانيا'] },
    { name: 'جيبوتي', flag: './flag-cards/dj.png', alternatives: ['djibouti', 'جيبوتي'] },
    { name: 'جزر القمر', flag: './flag-cards/km.png', alternatives: ['comoros', 'قمر'] },

    // دول آسيا
    { name: 'الصين', flag: './flag-cards/cn.png', alternatives: ['china', 'صين'] },
    { name: 'اليابان', flag: './flag-cards/jp.png', alternatives: ['japan', 'يابان'] },
    { name: 'الهند', flag: './flag-cards/in.png', alternatives: ['india', 'هند'] },
    { name: 'كوريا الجنوبية', flag: './flag-cards/kr.png', alternatives: ['south korea', 'كوريا', 'korea'] },
    { name: 'كوريا الشمالية', flag: './flag-cards/kp.png', alternatives: ['north korea', 'كوريا الشمالية'] },
    { name: 'تايلاند', flag: './flag-cards/th.png', alternatives: ['thailand', 'تايلند'] },
    { name: 'فيتنام', flag: './flag-cards/vn.png', alternatives: ['vietnam', 'فيتنام'] },
    { name: 'إندونيسيا', flag: './flag-cards/id.png', alternatives: ['indonesia', 'اندونيسيا'] },
    { name: 'ماليزيا', flag: './flag-cards/my.png', alternatives: ['malaysia', 'ماليزيا'] },
    { name: 'الفلبين', flag: './flag-cards/ph.png', alternatives: ['philippines', 'فلبين'] },
    { name: 'سنغافورة', flag: './flag-cards/sg.png', alternatives: ['singapore', 'سنغافورة'] },
    { name: 'باكستان', flag: './flag-cards/pk.png', alternatives: ['pakistan', 'باكستان'] },
    { name: 'بنغلاديش', flag: './flag-cards/bd.png', alternatives: ['bangladesh', 'بنغلاديش'] },
    { name: 'أفغانستان', flag: './flag-cards/af.png', alternatives: ['afghanistan', 'افغانستان'] },
    { name: 'إيران', flag: './flag-cards/ir.png', alternatives: ['iran', 'ايران'] },
    { name: 'تركيا', flag: './flag-cards/tr.png', alternatives: ['turkey', 'تركيا'] },
    { name: 'أذربيجان', flag: './flag-cards/az.png', alternatives: ['azerbaijan', 'اذربيجان'] },
    { name: 'نيبال', flag: './flag-cards/np.png', alternatives: ['nepal', 'نيبال'] },
    { name: 'بوتان', flag: './flag-cards/bt.png', alternatives: ['bhutan', 'بوتان'] },
    { name: 'سريلانكا', flag: './flag-cards/lk.png', alternatives: ['sri lanka', 'سريلانكا'] },
    { name: 'ميانمار', flag: './flag-cards/mm.png', alternatives: ['myanmar', 'burma', 'ميانمار'] },
    { name: 'لاوس', flag: './flag-cards/la.png', alternatives: ['laos', 'لاوس'] },
    { name: 'كمبوديا', flag: './flag-cards/kh.png', alternatives: ['cambodia', 'كمبوديا'] },
    { name: 'بروناي', flag: './flag-cards/bn.png', alternatives: ['brunei', 'بروناي'] },
    { name: 'تيمور الشرقية', flag: './flag-cards/tl.png', alternatives: ['timor leste', 'east timor', 'تيمور'] },
    { name: 'المالديف', flag: './flag-cards/mv.png', alternatives: ['maldives', 'المالديف'] },
    { name: 'منغوليا', flag: './flag-cards/mn.png', alternatives: ['mongolia', 'منغوليا'] },
    { name: 'كازاخستان', flag: './flag-cards/kz.png', alternatives: ['kazakhstan', 'كازاخستان'] },
    { name: 'أوزبكستان', flag: './flag-cards/uz.png', alternatives: ['uzbekistan', 'اوزبكستان'] },
    { name: 'تركمانستان', flag: './flag-cards/tm.png', alternatives: ['turkmenistan', 'تركمانستان'] },
    { name: 'قيرغيزستان', flag: './flag-cards/kg.png', alternatives: ['kyrgyzstan', 'قيرغيزستان'] },
    { name: 'طاجيكستان', flag: './flag-cards/tj.png', alternatives: ['tajikistan', 'طاجيكستان'] },
    { name: 'أرمينيا', flag: './flag-cards/am.png', alternatives: ['armenia', 'ارمينيا'] },
    { name: 'جورجيا', flag: './flag-cards/ge.png', alternatives: ['georgia', 'جورجيا'] },
    { name: 'هونغ كونغ', flag: './flag-cards/hk.png', alternatives: ['hong kong', 'هونغ كونغ'] },
    { name: 'ماكاو', flag: './flag-cards/mo.png', alternatives: ['macau', 'macao', 'ماكاو'] },
    { name: 'تايوان', flag: './flag-cards/tw.png', alternatives: ['taiwan', 'تايوان'] },
    { name: 'إسرائيل', flag: './flag-cards/il.png', alternatives: ['israel', 'اسرائيل'] },

    // دول أوروبا
    { name: 'ألمانيا', flag: './flag-cards/de.png', alternatives: ['germany', 'المانيا'] },
    { name: 'فرنسا', flag: './flag-cards/fr.png', alternatives: ['france', 'فرنسا'] },
    { name: 'بريطانيا', flag: './flag-cards/gb.png', alternatives: ['uk', 'england', 'britain', 'انجلترا'] },
    { name: 'إيطاليا', flag: './flag-cards/it.png', alternatives: ['italy', 'ايطاليا'] },
    { name: 'إسبانيا', flag: './flag-cards/es.png', alternatives: ['spain', 'اسبانيا'] },
    { name: 'روسيا', flag: './flag-cards/ru.png', alternatives: ['russia', 'روسيا'] },
    { name: 'هولندا', flag: './flag-cards/nl.png', alternatives: ['netherlands', 'هولندا'] },
    { name: 'بلجيكا', flag: './flag-cards/be.png', alternatives: ['belgium', 'بلجيكا'] },
    { name: 'سويسرا', flag: './flag-cards/ch.png', alternatives: ['switzerland', 'سويسرا'] },
    { name: 'السويد', flag: './flag-cards/se.png', alternatives: ['sweden', 'سويد'] },
    { name: 'النرويج', flag: './flag-cards/no.png', alternatives: ['norway', 'نرويج'] },
    { name: 'الدنمارك', flag: './flag-cards/dk.png', alternatives: ['denmark', 'دنمارك'] },
    { name: 'فنلندا', flag: './flag-cards/fi.png', alternatives: ['finland', 'فنلندا'] },
    { name: 'بولندا', flag: './flag-cards/pl.png', alternatives: ['poland', 'بولندا'] },
    { name: 'اليونان', flag: './flag-cards/gr.png', alternatives: ['greece', 'يونان'] },
    { name: 'البرتغال', flag: './flag-cards/pt.png', alternatives: ['portugal', 'برتغال'] },
    { name: 'النمسا', flag: './flag-cards/at.png', alternatives: ['austria', 'نمسا'] },
    { name: 'أوكرانيا', flag: './flag-cards/ua.png', alternatives: ['ukraine', 'اوكرانيا'] },
    { name: 'أيرلندا', flag: './flag-cards/ie.png', alternatives: ['ireland', 'ايرلندا'] },
    { name: 'التشيك', flag: './flag-cards/cz.png', alternatives: ['czech republic', 'czechia', 'تشيك'] },
    { name: 'المجر', flag: './flag-cards/hu.png', alternatives: ['hungary', 'هنغاريا', 'مجر'] },
    { name: 'رومانيا', flag: './flag-cards/ro.png', alternatives: ['romania', 'رومانيا'] },
    { name: 'بلغاريا', flag: './flag-cards/bg.png', alternatives: ['bulgaria', 'بلغاريا'] },
    { name: 'كرواتيا', flag: './flag-cards/hr.png', alternatives: ['croatia', 'كرواتيا'] },
    { name: 'صربيا', flag: './flag-cards/rs.png', alternatives: ['serbia', 'صربيا'] },
    { name: 'سلوفينيا', flag: './flag-cards/si.png', alternatives: ['slovenia', 'سلوفينيا'] },
    { name: 'سلوفاكيا', flag: './flag-cards/sk.png', alternatives: ['slovakia', 'سلوفاكيا'] },
    { name: 'البوسنة', flag: './flag-cards/ba.png', alternatives: ['bosnia', 'البوسنة', 'bosnia and herzegovina'] },
    { name: 'ألبانيا', flag: './flag-cards/al.png', alternatives: ['albania', 'البانيا'] },
    { name: 'مقدونيا', flag: './flag-cards/mk.png', alternatives: ['north macedonia', 'macedonia', 'مقدونيا'] },
    { name: 'الجبل الأسود', flag: './flag-cards/me.png', alternatives: ['montenegro', 'الجبل الاسود'] },
    { name: 'كوسوفو', flag: './flag-cards/xk.png', alternatives: ['kosovo', 'كوسوفو'] },
    { name: 'لوكسمبورغ', flag: './flag-cards/lu.png', alternatives: ['luxembourg', 'لوكسمبورغ'] },
    { name: 'مالطا', flag: './flag-cards/mt.png', alternatives: ['malta', 'مالطا'] },
    { name: 'قبرص', flag: './flag-cards/cy.png', alternatives: ['cyprus', 'قبرص'] },
    { name: 'إستونيا', flag: './flag-cards/ee.png', alternatives: ['estonia', 'استونيا'] },
    { name: 'لاتفيا', flag: './flag-cards/lv.png', alternatives: ['latvia', 'لاتفيا'] },
    { name: 'ليتوانيا', flag: './flag-cards/lt.png', alternatives: ['lithuania', 'ليتوانيا'] },
    { name: 'مولدوفا', flag: './flag-cards/md.png', alternatives: ['moldova', 'مولدوفا'] },
    { name: 'بيلاروسيا', flag: './flag-cards/by.png', alternatives: ['belarus', 'بيلاروسيا'] },
    { name: 'موناكو', flag: './flag-cards/mc.png', alternatives: ['monaco', 'موناكو'] },
    { name: 'ليختنشتاين', flag: './flag-cards/li.png', alternatives: ['liechtenstein', 'ليختنشتاين'] },
    { name: 'أندورا', flag: './flag-cards/ad.png', alternatives: ['andorra', 'اندورا'] },
    { name: 'سان مارينو', flag: './flag-cards/sm.png', alternatives: ['san marino', 'سان مارينو'] },
    { name: 'الفاتيكان', flag: './flag-cards/va.png', alternatives: ['vatican', 'الفاتيكان'] },
    { name: 'أيسلندا', flag: './flag-cards/is.png', alternatives: ['iceland', 'ايسلندا'] },
    { name: 'جزر فارو', flag: './flag-cards/fo.png', alternatives: ['faroe islands', 'فارو'] },
    { name: 'جزر آلاند', flag: './flag-cards/ax.png', alternatives: ['aland islands', 'الاند'] },

    // الأمريكتان
    { name: 'أمريكا', flag: './flag-cards/us.png', alternatives: ['usa', 'america', 'امريكا', 'الولايات المتحدة'] },
    { name: 'كندا', flag: './flag-cards/ca.png', alternatives: ['canada', 'كندا'] },
    { name: 'المكسيك', flag: './flag-cards/mx.png', alternatives: ['mexico', 'مكسيك'] },
    { name: 'البرازيل', flag: './flag-cards/br.png', alternatives: ['brazil', 'برازيل'] },
    { name: 'الأرجنتين', flag: './flag-cards/ar.png', alternatives: ['argentina', 'ارجنتين'] },
    { name: 'تشيلي', flag: './flag-cards/cl.png', alternatives: ['chile', 'تشيلي'] },
    { name: 'كولومبيا', flag: './flag-cards/co.png', alternatives: ['colombia', 'كولومبيا'] },
    { name: 'بيرو', flag: './flag-cards/pe.png', alternatives: ['peru', 'بيرو'] },
    { name: 'فنزويلا', flag: './flag-cards/ve.png', alternatives: ['venezuela', 'فنزويلا'] },
    { name: 'الإكوادور', flag: './flag-cards/ec.png', alternatives: ['ecuador', 'اكوادور'] },
    { name: 'بوليفيا', flag: './flag-cards/bo.png', alternatives: ['bolivia', 'بوليفيا'] },
    { name: 'باراغواي', flag: './flag-cards/py.png', alternatives: ['paraguay', 'باراغواي'] },
    { name: 'أوروغواي', flag: './flag-cards/uy.png', alternatives: ['uruguay', 'اوروغواي'] },
    { name: 'غيانا', flag: './flag-cards/gy.png', alternatives: ['guyana', 'غيانا'] },
    { name: 'سورينام', flag: './flag-cards/sr.png', alternatives: ['suriname', 'سورينام'] },
    { name: 'كوبا', flag: './flag-cards/cu.png', alternatives: ['cuba', 'كوبا'] },
    { name: 'جامايكا', flag: './flag-cards/jm.png', alternatives: ['jamaica', 'جامايكا'] },
    { name: 'هايتي', flag: './flag-cards/ht.png', alternatives: ['haiti', 'هايتي'] },
    { name: 'الدومينيكان', flag: './flag-cards/do.png', alternatives: ['dominican republic', 'الدومينيكان'] },
    { name: 'غواتيمالا', flag: './flag-cards/gt.png', alternatives: ['guatemala', 'غواتيمالا'] },
    { name: 'هندوراس', flag: './flag-cards/hn.png', alternatives: ['honduras', 'هندوراس'] },
    { name: 'السلفادور', flag: './flag-cards/sv.png', alternatives: ['el salvador', 'السلفادور'] },
    { name: 'نيكاراغوا', flag: './flag-cards/ni.png', alternatives: ['nicaragua', 'نيكاراغوا'] },
    { name: 'كوستاريكا', flag: './flag-cards/cr.png', alternatives: ['costa rica', 'كوستاريكا'] },
    { name: 'بنما', flag: './flag-cards/pa.png', alternatives: ['panama', 'بنما'] },
    { name: 'بليز', flag: './flag-cards/bz.png', alternatives: ['belize', 'بليز'] },
    { name: 'جزر البهاما', flag: './flag-cards/bs.png', alternatives: ['bahamas', 'باهاماس', 'البهاما'] },
    { name: 'باربادوس', flag: './flag-cards/bb.png', alternatives: ['barbados', 'باربادوس'] },
    { name: 'ترينيداد', flag: './flag-cards/tt.png', alternatives: ['trinidad and tobago', 'ترينيداد'] },

    // أفريقيا
    { name: 'جنوب أفريقيا', flag: './flag-cards/za.png', alternatives: ['south africa', 'جنوب افريقيا'] },
    { name: 'نيجيريا', flag: './flag-cards/ng.png', alternatives: ['nigeria', 'نيجيريا'] },
    { name: 'كينيا', flag: './flag-cards/ke.png', alternatives: ['kenya', 'كينيا'] },
    { name: 'إثيوبيا', flag: './flag-cards/et.png', alternatives: ['ethiopia', 'اثيوبيا'] },
    { name: 'غانا', flag: './flag-cards/gh.png', alternatives: ['ghana', 'غانا'] },
    { name: 'تنزانيا', flag: './flag-cards/tz.png', alternatives: ['tanzania', 'تنزانيا'] },
    { name: 'أنغولا', flag: './flag-cards/ao.png', alternatives: ['angola', 'انغولا'] },
    { name: 'موزمبيق', flag: './flag-cards/mz.png', alternatives: ['mozambique', 'موزمبيق'] },
    { name: 'زيمبابوي', flag: './flag-cards/zw.png', alternatives: ['zimbabwe', 'زيمبابوي'] },
    { name: 'بوتسوانا', flag: './flag-cards/bw.png', alternatives: ['botswana', 'بوتسوانا'] },
    { name: 'ناميبيا', flag: './flag-cards/na.png', alternatives: ['namibia', 'ناميبيا'] },
    { name: 'زامبيا', flag: './flag-cards/zm.png', alternatives: ['zambia', 'زامبيا'] },
    { name: 'مالاوي', flag: './flag-cards/mw.png', alternatives: ['malawi', 'مالاوي'] },
    { name: 'مدغشقر', flag: './flag-cards/mg.png', alternatives: ['madagascar', 'مدغشقر'] },
    { name: 'أوغندا', flag: './flag-cards/ug.png', alternatives: ['uganda', 'اوغندا'] },
    { name: 'رواندا', flag: './flag-cards/rw.png', alternatives: ['rwanda', 'رواندا'] },
    { name: 'بوروندي', flag: './flag-cards/bi.png', alternatives: ['burundi', 'بوروندي'] },
    { name: 'الكاميرون', flag: './flag-cards/cm.png', alternatives: ['cameroon', 'الكاميرون'] },
    { name: 'تشاد', flag: './flag-cards/td.png', alternatives: ['chad', 'تشاد'] },
    { name: 'النيجر', flag: './flag-cards/ne.png', alternatives: ['niger', 'النيجر'] },
    { name: 'مالي', flag: './flag-cards/ml.png', alternatives: ['mali', 'مالي'] },
    { name: 'بوركينا فاسو', flag: './flag-cards/bf.png', alternatives: ['burkina faso', 'بوركينا فاسو'] },
    { name: 'السنغال', flag: './flag-cards/sn.png', alternatives: ['senegal', 'السنغال'] },
    { name: 'غامبيا', flag: './flag-cards/gm.png', alternatives: ['gambia', 'غامبيا'] },
    { name: 'غينيا', flag: './flag-cards/gn.png', alternatives: ['guinea', 'غينيا'] },
    { name: 'ساحل العاج', flag: './flag-cards/ci.png', alternatives: ['ivory coast', 'cote divoire', 'ساحل العاج'] },
    { name: 'ليبيريا', flag: './flag-cards/lr.png', alternatives: ['liberia', 'ليبيريا'] },
    { name: 'سيراليون', flag: './flag-cards/sl.png', alternatives: ['sierra leone', 'سيراليون'] },
    { name: 'توغو', flag: './flag-cards/tg.png', alternatives: ['togo', 'توغو'] },
    { name: 'بنين', flag: './flag-cards/bj.png', alternatives: ['benin', 'بنين'] },
    { name: 'الغابون', flag: './flag-cards/ga.png', alternatives: ['gabon', 'الغابون'] },
    { name: 'الكونغو', flag: './flag-cards/cg.png', alternatives: ['congo', 'الكونغو'] },
    { name: 'جنوب السودان', flag: './flag-cards/ss.png', alternatives: ['south sudan', 'جنوب السودان'] },
    { name: 'إريتريا', flag: './flag-cards/er.png', alternatives: ['eritrea', 'اريتريا'] },

    // أوقيانوسيا
    { name: 'أستراليا', flag: './flag-cards/au.png', alternatives: ['australia', 'استراليا'] },
    { name: 'نيوزيلندا', flag: './flag-cards/nz.png', alternatives: ['new zealand', 'نيوزيلندا'] },
    { name: 'بولينيزيا الفرنسية', flag: './flag-cards/pf.png', alternatives: ['french polynesia', 'بولينيزيا', 'تاهيتي'] },
    { name: 'فيجي', flag: './flag-cards/fj.png', alternatives: ['fiji', 'فيجي'] }
];

// تخزين اللعبة النشطة لكل قناة
const activeGames = new Map();

client.once('clientReady', () => {
    console.log(`✅ البوت شغال! تم تسجيل الدخول كـ ${client.user.tag}`);
    console.log(`🎮 عدد الأعلام المتاحة: ${countries.length} علم`);
});

// أمر بدء اللعبة
client.on('messageCreate', message => {
    if (message.author.bot) return;

    // بدء اللعبة
    if (message.content === '-اعلام' || message.content === '!flag') {
        if (activeGames.has(message.channel.id)) {
            message.reply('⚠️ في لعبة شغالة حالياً! جاوب على السؤال الحالي أول.');
            return;
        }

        // اختيار دولة عشوائية
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];

        // التحقق من وجود الملف
        if (!fs.existsSync(randomCountry.flag)) {
            message.reply('❌ خطأ: الملف غير موجود! تأكد من تشغيل سكريبت create-flag-cards.js');
            return;
        }

        // حفظ اللعبة النشطة
        activeGames.set(message.channel.id, {
            country: randomCountry,
            startTime: Date.now()
        });

        // إرسال العلم
        message.channel.send({
            files: [randomCountry.flag]
        });

        // مؤقت 15 ثانية
        const timeout = setTimeout(() => {
            // التحقق إذا اللعبة لسه موجودة (يعني ما أحد جاوب)
            if (activeGames.has(message.channel.id)) {
                const game = activeGames.get(message.channel.id);

                message.channel.send({
                    content: `⏰ **انتهى الوقت!**\n❌ لم يجب أحد بشكل صحيح\n✅ الإجابة الصحيحة: **${game.country.name}**`
                });

                activeGames.delete(message.channel.id);
            }
        }, 15000); // 15 ثانية

        // حفظ الـ timeout مع اللعبة عشان نقدر نلغيه لو أحد جاوب
        activeGames.get(message.channel.id).timeout = timeout;

        return;
    }

    // التحقق من الإجابة
    if (activeGames.has(message.channel.id)) {
        const game = activeGames.get(message.channel.id);
        const userAnswer = message.content.toLowerCase().trim();
        const correctAnswers = [
            game.country.name.toLowerCase(),
            ...game.country.alternatives.map(alt => alt.toLowerCase())
        ];

        // التحقق من الإجابة
        if (correctAnswers.includes(userAnswer)) {
            const timeTaken = ((Date.now() - game.startTime) / 1000).toFixed(1);

            // إلغاء الـ timeout لأن أحد جاوب صح
            if (game.timeout) {
                clearTimeout(game.timeout);
            }

            message.reply(`😽 إجابة صحيحة! **${message.author}** شطوووور`);
            activeGames.delete(message.channel.id);
        }
    }

    // أمر المساعدة
    if (message.content === '!help' || message.content === '!مساعدة') {
        const helpEmbed = new EmbedBuilder()
            .setTitle('📖 قائمة الأوامر')
            .setDescription('**أوامر بوت الأعلام:**')
            .addFields(
                { name: '-اعلام أو !flag', value: 'بدء لعبة تخمين العلم', inline: false },
                { name: '!مساعدة أو !help', value: 'عرض هذه القائمة', inline: false }
            )
            .setColor('#3498db')
            .setFooter({ text: `استمتع باللعب! 🎮 | ${countries.length} علم متاح` });

        message.reply({ embeds: [helpEmbed] });
    }
});

// تسجيل الدخول - ضع التوكن هنا
client.login(process.env.TOKEN);



