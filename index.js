const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const http = require("http");
const unzipper = require("unzipper");

const PORT = process.env.PORT || 3000;

/* ================= KEEP ALIVE ================= */
http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Bot is running!");
}).listen(PORT);

/* ================= UNZIP FLAGS ================= */
const zipPath = "./flag-cards.zip";
const extractPath = "./flag-cards";

function extractFlags() {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(extractPath)) return resolve();
        fs.createReadStream(zipPath)
            .pipe(unzipper.Extract({ path: extractPath }))
            .on('close', resolve)
            .on('error', reject);
    });
}

/* ================= CLIENT ================= */
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

/* ================= COUNTRIES ================= */
const countries = [

    /* ================= الدول العربية ================= */
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

    /* ================= آسيا ================= */
    { name: 'الصين', flag: './flag-cards/cn.png', alternatives: ['china', 'صين'] },
    { name: 'اليابان', flag: './flag-cards/jp.png', alternatives: ['japan', 'يابان'] },
    { name: 'الهند', flag: './flag-cards/in.png', alternatives: ['india', 'هند'] },
    { name: 'كوريا الجنوبية', flag: './flag-cards/kr.png', alternatives: ['south korea', 'korea', 'كوريا'] },
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

    /* ================= أوروبا ================= */
    { name: 'ألمانيا', flag: './flag-cards/de.png', alternatives: ['germany', 'المانيا'] },
    { name: 'فرنسا', flag: './flag-cards/fr.png', alternatives: ['france', 'فرنسا'] },
    { name: 'بريطانيا', flag: './flag-cards/gb.png', alternatives: ['uk', 'britain', 'england', 'انجلترا'] },
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
    { name: 'البرتغال', flag: './flag-cards/pt.png', alternatives: ['portugal', 'برتغال'] },
    { name: 'اليونان', flag: './flag-cards/gr.png', alternatives: ['greece', 'يونان'] },
    { name: 'أوكرانيا', flag: './flag-cards/ua.png', alternatives: ['ukraine', 'اوكرانيا'] },

    /* ================= الأمريكتان ================= */
    { name: 'أمريكا', flag: './flag-cards/us.png', alternatives: ['usa', 'america', 'امريكا', 'الولايات المتحدة'] },
    { name: 'كندا', flag: './flag-cards/ca.png', alternatives: ['canada', 'كندا'] },
    { name: 'المكسيك', flag: './flag-cards/mx.png', alternatives: ['mexico', 'مكسيك'] },
    { name: 'البرازيل', flag: './flag-cards/br.png', alternatives: ['brazil', 'برازيل'] },
    { name: 'الأرجنتين', flag: './flag-cards/ar.png', alternatives: ['argentina', 'ارجنتين'] },
    { name: 'تشيلي', flag: './flag-cards/cl.png', alternatives: ['chile', 'تشيلي'] },
    { name: 'كولومبيا', flag: './flag-cards/co.png', alternatives: ['colombia', 'كولومبيا'] },

    /* ================= أفريقيا ================= */
    { name: 'جنوب أفريقيا', flag: './flag-cards/za.png', alternatives: ['south africa', 'جنوب افريقيا'] },
    { name: 'نيجيريا', flag: './flag-cards/ng.png', alternatives: ['nigeria', 'نيجيريا'] },
    { name: 'كينيا', flag: './flag-cards/ke.png', alternatives: ['kenya', 'كينيا'] },
    { name: 'غانا', flag: './flag-cards/gh.png', alternatives: ['ghana', 'غانا'] },
    { name: 'إثيوبيا', flag: './flag-cards/et.png', alternatives: ['ethiopia', 'اثيوبيا'] },

    /* ================= أوقيانوسيا ================= */
    { name: 'أستراليا', flag: './flag-cards/au.png', alternatives: ['australia', 'استراليا'] },
    { name: 'نيوزيلندا', flag: './flag-cards/nz.png', alternatives: ['new zealand', 'نيوزيلندا'] },
    { name: 'فيجي', flag: './flag-cards/fj.png', alternatives: ['fiji', 'فيجي'] },
    // أقاليم وجزر إضافية (أوروبا)
    { name: 'جيرزي', flag: './flag-cards/je.png', alternatives: ['jersey', 'جيرزي'] },
    { name: 'غيرنزي', flag: './flag-cards/gg.png', alternatives: ['guernsey', 'غيرنزي'] },
    { name: 'جزيرة مان', flag: './flag-cards/im.png', alternatives: ['isle of man', 'مان'] },

    // أقاليم الكاريبي
    { name: 'أروبا', flag: './flag-cards/aw.png', alternatives: ['aruba', 'اروبا'] },
    { name: 'كوراساو', flag: './flag-cards/cw.png', alternatives: ['curaçao', 'curacao', 'كوراساو'] },
    { name: 'سانت مارتن', flag: './flag-cards/sx.png', alternatives: ['sint maarten', 'سانت مارتن'] },
    { name: 'بونير', flag: './flag-cards/bq.png', alternatives: ['bonaire', 'بونير'] },
    { name: 'سانت لوسيا', flag: './flag-cards/lc.png', alternatives: ['saint lucia', 'سانت لوسيا'] },
    { name: 'سانت فنسنت', flag: './flag-cards/vc.png', alternatives: ['saint vincent', 'سانت فنسنت'] },
    { name: 'غرينادا', flag: './flag-cards/gd.png', alternatives: ['grenada', 'غرينادا'] },
    { name: 'سانت كيتس', flag: './flag-cards/kn.png', alternatives: ['saint kitts', 'سانت كيتس'] },
    { name: 'مونتسرات', flag: './flag-cards/ms.png', alternatives: ['montserrat', 'مونتسرات'] },
    { name: 'أنغويلا', flag: './flag-cards/ai.png', alternatives: ['anguilla', 'أنغويلا'] },
    { name: 'جزر كايمان', flag: './flag-cards/ky.png', alternatives: ['cayman islands', 'كايمان'] },
    { name: 'جزر توركس وكايكوس', flag: './flag-cards/tc.png', alternatives: ['turks and caicos', 'توركس'] },

    // أقاليم أمريكا
    { name: 'غرينلاند', flag: './flag-cards/gl.png', alternatives: ['greenland', 'غرينلاند'] },
    { name: 'برمودا', flag: './flag-cards/bm.png', alternatives: ['bermuda', 'برمودا'] },
    { name: 'سانت بيير', flag: './flag-cards/pm.png', alternatives: ['saint pierre', 'سان بيير'] },

    // أقاليم آسيا
    { name: 'غوام', flag: './flag-cards/gu.png', alternatives: ['guam', 'غوام'] },
    { name: 'جزر ماريانا الشمالية', flag: './flag-cards/mp.png', alternatives: ['northern mariana islands', 'ماريانا'] },
    { name: 'بالاو', flag: './flag-cards/pw.png', alternatives: ['palau', 'بالاو'] },
    { name: 'ميكرونيزيا', flag: './flag-cards/fm.png', alternatives: ['micronesia', 'ميكرونيزيا'] },
    { name: 'جزر مارشال', flag: './flag-cards/mh.png', alternatives: ['marshall islands', 'مارشال'] },
    { name: 'ساموا الأمريكية', flag: './flag-cards/as.png', alternatives: ['american samoa', 'ساموا الامريكية'] },

    // أقاليم أفريقيا
    { name: 'مايوت', flag: './flag-cards/yt.png', alternatives: ['mayotte', 'مايوت'] },
    { name: 'ريونيون', flag: './flag-cards/re.png', alternatives: ['reunion', 'ريونيون'] },
    { name: 'سانت هيلينا', flag: './flag-cards/sh.png', alternatives: ['saint helena', 'سانت هيلينا'] },

    // أقاليم أوقيانوسيا
    { name: 'كاليدونيا الجديدة', flag: './flag-cards/nc.png', alternatives: ['new caledonia', 'كاليدونيا'] },
    { name: 'ساموا', flag: './flag-cards/ws.png', alternatives: ['samoa', 'ساموا'] },
    { name: 'تونغا', flag: './flag-cards/to.png', alternatives: ['tonga', 'تونغا'] },
    { name: 'كيريباتي', flag: './flag-cards/ki.png', alternatives: ['kiribati', 'كيريباتي'] },
    { name: 'ناورو', flag: './flag-cards/nr.png', alternatives: ['nauru', 'ناورو'] },
    { name: 'توفالو', flag: './flag-cards/tv.png', alternatives: ['tuvalu', 'توفالو'] },
    // أقاليم فرنسا
    { name: 'غوادلوب', flag: './flag-cards/gp.png', alternatives: ['guadeloupe', 'غوادلوب'] },
    { name: 'مارتينيك', flag: './flag-cards/mq.png', alternatives: ['martinique', 'مارتينيك'] },
    { name: 'غيانا الفرنسية', flag: './flag-cards/gf.png', alternatives: ['french guiana', 'غيانا الفرنسية'] },
    { name: 'سانت مارتن الفرنسية', flag: './flag-cards/mf.png', alternatives: ['saint martin', 'سانت مارتن الفرنسية'] },
    { name: 'سان بارتليمي', flag: './flag-cards/bl.png', alternatives: ['saint barthelemy', 'سان بارتليمي'] },
    { name: 'واليس وفوتونا', flag: './flag-cards/wf.png', alternatives: ['wallis and futuna', 'واليس'] },

    // أقاليم بريطانيا
    { name: 'جزر بيتكيرن', flag: './flag-cards/pn.png', alternatives: ['pitcairn islands', 'بيتكيرن'] },
    { name: 'جزر فوكلاند', flag: './flag-cards/fk.png', alternatives: ['falkland islands', 'فوكلاند'] },
    { name: 'جورجيا الجنوبية', flag: './flag-cards/gs.png', alternatives: ['south georgia', 'جورجيا الجنوبية'] },
    { name: 'الإقليم البريطاني بالمحيط الهندي', flag: './flag-cards/io.png', alternatives: ['british indian ocean territory', 'بيوت'] },
    { name: 'جزر العذراء البريطانية', flag: './flag-cards/vg.png', alternatives: ['british virgin islands', 'فيرجن البريطانية'] },

    // أقاليم أمريكا
    { name: 'بورتوريكو', flag: './flag-cards/pr.png', alternatives: ['puerto rico', 'بورتو ريكو'] },
    { name: 'جزر العذراء الأمريكية', flag: './flag-cards/vi.png', alternatives: ['us virgin islands', 'فيرجن الامريكية'] },

    // أقاليم هولندا
    //{ name: 'سابا', flag: './flag-cards/sx.png', alternatives: ['saba', 'سابا'] },
    //{ name: 'سانت أوستاتيوس', flag: './flag-cards/bq.png', alternatives: ['sint eustatius', 'اوستاتيوس'] },

    // أقاليم خاصة
    { name: 'انتاركتيكا', flag: './flag-cards/aq.png', alternatives: ['antarctica', 'القطب الجنوبي'] },
    { name: 'جزيرة بوفيه', flag: './flag-cards/bv.png', alternatives: ['bouvet island', 'بوفيه'] },
    { name: 'جزر هيرد وماكدونالد', flag: './flag-cards/hm.png', alternatives: ['heard island', 'ماكدونالد'] },

    // دول إضافية نادرة
    { name: 'إسواتيني', flag: './flag-cards/sz.png', alternatives: ['eswatini', 'سوازيلاند'] },
    { name: 'الراس الاخضر', flag: './flag-cards/cv.png', alternatives: ['cape verde', 'كاب فيردي'] },
    { name: 'ساو تومي وبرينسيب', flag: './flag-cards/st.png', alternatives: ['sao tome', 'ساو تومي'] },
    { name: 'غينيا بيساو', flag: './flag-cards/gw.png', alternatives: ['guinea bissau', 'غينيا بيساو'] },

    // آسيا الوسطى والمحيط الهادئ
    { name: 'فانواتو', flag: './flag-cards/vu.png', alternatives: ['vanuatu', 'فانواتو'] },
    { name: 'جزر سليمان', flag: './flag-cards/sb.png', alternatives: ['solomon islands', 'سليمان'] },
    { name: 'بابوا غينيا الجديدة', flag: './flag-cards/pg.png', alternatives: ['papua new guinea', 'بابوا'] },

];

/* ================= STORAGE ================= */
const activeGames = new Map();
const activeEvents = new Map();

/* ================= READY ================= */
client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

/* ================= MESSAGE ================= */
client.on('messageCreate', message => {
    if (message.author.bot) return;
    const args = message.content.split(" ");

    /* ========= SINGLE GAME ========= */
    if (message.content === '-اعلام') {
        if (activeGames.has(message.channel.id)) return message.reply('⚠️ في لعبة شغالة');

        const country = countries[Math.floor(Math.random() * countries.length)];
        activeGames.set(message.channel.id, country);

        message.channel.send({ files: [country.flag] });

        const timeout = setTimeout(() => {
            message.channel.send(`⏰ انتهى الوقت\n✅ الإجابة: **${country.name}**`);
            activeGames.delete(message.channel.id);
        }, 15000);

        country.timeout = timeout;
        return;
    }

    if (activeGames.has(message.channel.id)) {
        const game = activeGames.get(message.channel.id);
        const answer = message.content.toLowerCase().trim();
        const valid = [game.name.toLowerCase(), ...game.alternatives.map(a => a.toLowerCase())];

        if (valid.includes(answer)) {
            clearTimeout(game.timeout);
            message.reply('😽😽 شطوووور');
            activeGames.delete(message.channel.id);
        }
        return;
    }

    /* ========= EVENT START ========= */
    if (args[0] === '-ايفنت' && args[1] === 'اعلام') {
        if (activeEvents.has(message.channel.id))
            return message.reply('⚠️ فيه إيفنت شغال');

        const rounds = parseInt(args[2]) || 5;

        const eventData = {
            rounds,
            currentRound: 0,
            leaderboard: new Map(),
            game: null,
            timeout: null,
            ended: false
        };

        activeEvents.set(message.channel.id, eventData);

        message.channel.send(`🎉 **بدأ إيفنت الأعلام**\n🕹️ عدد الجولات: **${rounds}**`);

        const playRound = () => {
            if (eventData.ended) return;

            if (eventData.currentRound >= eventData.rounds) {
                const sorted = [...eventData.leaderboard.entries()]
                    .sort((a, b) => b[1] - a[1]);

                const embed = new EmbedBuilder()
                    .setTitle('🏁 انتهى الإيفنت')
                    .setColor('#2ecc71')
                    .setDescription(
                        sorted.length
                            ? sorted.map((e, i) => {
                                const medals = ['🥇', '🥈', '🥉'];
                                return `${medals[i] || '🎯'} **${e[0]}** — ${e[1]} نقطة`;
                            }).join('\n')
                            : '❌ ما فيه إجابات صحيحة'
                    )
                    .setFooter({ text: 'شكراً لمشاركتكم ❤️' });

                message.channel.send({ embeds: [embed] });
                activeEvents.delete(message.channel.id);
                return;
            }

            eventData.currentRound++;

            const country = countries[Math.floor(Math.random() * countries.length)];
            eventData.game = country;

            //message.channel.send(`🎯 الجولة ${eventData.currentRound}/${eventData.rounds}`);
            message.channel.send({ files: [country.flag] });

            eventData.timeout = setTimeout(() => {
                if (eventData.ended) return;
                message.channel.send(`⏰ انتهى الوقت\n✅ الإجابة: **${country.name}**`);
                eventData.game = null;
                setTimeout(playRound, 3000);
            }, 15000);
        };

        eventData.playRound = playRound;
        playRound();
        return;
    }

    /* ========= EVENT ANSWER ========= */
    if (activeEvents.has(message.channel.id)) {
        const event = activeEvents.get(message.channel.id);
        if (!event.game || event.ended) return;

        const answer = message.content.toLowerCase().trim();
        const valid = [
            event.game.name.toLowerCase(),
            ...event.game.alternatives.map(a => a.toLowerCase())
        ];

        if (valid.includes(answer)) {
            clearTimeout(event.timeout);

            const user = message.author.username;
            event.leaderboard.set(user, (event.leaderboard.get(user) || 0) + 1);

            message.reply('😽😽 شطوووور');
            event.game = null;

            setTimeout(event.playRound, 3000);
        }
        return;
    }

    /* ========= CANCEL ========= */
    if (message.content === '-الغاء ايفنت') {
        if (!activeEvents.has(message.channel.id))
            return message.reply('❌ ما فيه إيفنت');

        const event = activeEvents.get(message.channel.id);
        event.ended = true;
        if (event.timeout) clearTimeout(event.timeout);
        activeEvents.delete(message.channel.id);

        message.reply('🛑 تم إلغاء الإيفنت');
    }
});

/* ================= LOGIN ================= */
(async () => {
    await extractFlags();
    client.login(process.env.TOKEN);
})();

