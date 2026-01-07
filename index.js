const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const http = require("http");
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Bot is running!");
}).listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
const unzipper = require("unzipper");

const zipPath = "./flag-cards.zip";
const extractPath = "./flag-cards";

// دالة فك الضغط مع Promise
function extractFlags() {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(extractPath)) {
            console.log('✅ مجلد الأعلام موجود مسبقاً');
            resolve();
            return;
        }

        console.log('🔄 جاري فك ضغط الأعلام...');
        fs.createReadStream(zipPath)
            .pipe(unzipper.Extract({ path: extractPath }))
            .on('close', () => {
                console.log('✅ تم فك ضغط الأعلام بنجاح!');
                resolve();
            })
            .on('error', (err) => {
                console.error('❌ خطأ في فك الضغط:', err);
                reject(err);
            });
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

    /* ================= الدول العربية ================= */
    { name: 'السعودية', flag: './flag-cards/sa.png', alternatives: ['saudi arabia', 'سعودية', 'المملكة'] },
    { name: 'الامارات', flag: './flag-cards/ae.png', alternatives: ['uae', 'emirates', 'امارات'] },
    { name: 'مصر', flag: './flag-cards/eg.png', alternatives: ['egypt', 'مصر'] },
    { name: 'الكويت', flag: './flag-cards/kw.png', alternatives: ['kuwait', 'كويت'] },
    { name: 'قطر', flag: './flag-cards/qa.png', alternatives: ['qatar', 'قطر'] },
    { name: 'البحرين', flag: './flag-cards/bh.png', alternatives: ['bahrain', 'بحرين'] },
    { name: 'عمان', flag: './flag-cards/om.png', alternatives: ['oman', 'عمان'] },
    { name: 'الاردن', flag: './flag-cards/jo.png', alternatives: ['jordan', 'اردن'] },
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
    
    /* ================= أقاليم وجزر ================= */
    { name: 'جيرزي', flag: './flag-cards/je.png', alternatives: ['jersey', 'جيرزي'] },
    { name: 'غيرنزي', flag: './flag-cards/gg.png', alternatives: ['guernsey', 'غيرنزي'] },
    { name: 'جزيرة مان', flag: './flag-cards/im.png', alternatives: ['isle of man', 'مان'] },
    { name: 'أروبا', flag: './flag-cards/aw.png', alternatives: ['aruba', 'اروبا'] },
    { name: 'كوراساو', flag: './flag-cards/cw.png', alternatives: ['curaçao', 'curacao', 'كوراساو'] },
    { name: 'سانت مارتن', flag: './flag-cards/sx.png', alternatives: ['sint maarten', 'سانت مارتن'] },
    { name: 'بونير', flag: './flag-cards/bq.png', alternatives: ['bonaire', 'بونير'] },
    { name: 'سانت لوسيا', flag: './flag-cards/lc.png', alternatives: ['saint lucia', 'سانت لوسيا'] },
    { name: 'سانت فنسنت والغرينادين', flag: './flag-cards/vc.png', alternatives: ['saint vincent', 'سانت فنسنت'] },
    { name: 'غرينادا', flag: './flag-cards/gd.png', alternatives: ['grenada', 'غرينادا'] },
    { name: 'سانت كيتس ونيفيس', flag: './flag-cards/kn.png', alternatives: ['saint kitts', 'سانت كيتس'] },
    { name: 'مونتسرات', flag: './flag-cards/ms.png', alternatives: ['montserrat', 'مونتسرات'] },
    { name: 'انغويلا', flag: './flag-cards/ai.png', alternatives: ['anguilla', 'أنغويلا'] },
    { name: 'جزر كايمان', flag: './flag-cards/ky.png', alternatives: ['cayman islands', 'كايمان'] },
    { name: 'جزر توركس وكايكوس', flag: './flag-cards/tc.png', alternatives: ['turks and caicos', 'توركس'] },
    { name: 'غرينلاند', flag: './flag-cards/gl.png', alternatives: ['greenland', 'غرينلاند'] },
    { name: 'برمودا', flag: './flag-cards/bm.png', alternatives: ['bermuda', 'برمودا'] },
    { name: 'سانت بيير وميكلون', flag: './flag-cards/pm.png', alternatives: ['saint pierre', 'سان بيير'] },
    { name: 'غوام', flag: './flag-cards/gu.png', alternatives: ['guam', 'غوام'] },
    { name: 'جزر ماريانا الشمالية', flag: './flag-cards/mp.png', alternatives: ['northern mariana islands', 'ماريانا'] },
    { name: 'بالاو', flag: './flag-cards/pw.png', alternatives: ['palau', 'بالاو'] },
    { name: 'ميكرونيزيا', flag: './flag-cards/fm.png', alternatives: ['micronesia', 'ميكرونيزيا'] },
    { name: 'جزر مارشال', flag: './flag-cards/mh.png', alternatives: ['marshall islands', 'مارشال'] },
    { name: 'ساموا الأمريكية', flag: './flag-cards/as.png', alternatives: ['american samoa', 'ساموا الامريكية'] },
    { name: 'مايوت', flag: './flag-cards/yt.png', alternatives: ['mayotte', 'مايوت'] },
    { name: 'ريونيون', flag: './flag-cards/re.png', alternatives: ['reunion', 'ريونيون'] },
    { name: 'سانت هيلينا', flag: './flag-cards/sh.png', alternatives: ['saint helena', 'سانت هيلينا'] },
    { name: 'كاليدونيا الجديدة', flag: './flag-cards/nc.png', alternatives: ['new caledonia', 'كاليدونيا'] },
    { name: 'ساموا', flag: './flag-cards/ws.png', alternatives: ['samoa', 'ساموا'] },
    { name: 'تونغا', flag: './flag-cards/to.png', alternatives: ['tonga', 'تونغا'] },
    { name: 'كيريباتي', flag: './flag-cards/ki.png', alternatives: ['kiribati', 'كيريباتي'] },
    { name: 'ناورو', flag: './flag-cards/nr.png', alternatives: ['nauru', 'ناورو'] },
    { name: 'توفالو', flag: './flag-cards/tv.png', alternatives: ['tuvalu', 'توفالو'] },
    { name: 'غوادلوب', flag: './flag-cards/gp.png', alternatives: ['guadeloupe', 'غوادلوب'] },
    { name: 'مارتينيك', flag: './flag-cards/mq.png', alternatives: ['martinique', 'مارتينيك'] },
    { name: 'غويانا الفرنسية', flag: './flag-cards/gf.png', alternatives: ['french guiana', 'غيانا الفرنسية'] },
    { name: 'سانت مارتن الفرنسية', flag: './flag-cards/mf.png', alternatives: ['saint martin', 'سانت مارتن الفرنسية'] },
    { name: 'سان بارتليمي', flag: './flag-cards/bl.png', alternatives: ['saint barthelemy', 'سان بارتليمي'] },
    { name: 'واليس وفوتونا', flag: './flag-cards/wf.png', alternatives: ['wallis and futuna', 'واليس'] },
    { name: 'جزر بيتكيرن', flag: './flag-cards/pn.png', alternatives: ['pitcairn islands', 'بيتكيرن'] },
    { name: 'جزر فوكلاند', flag: './flag-cards/fk.png', alternatives: ['falkland islands', 'فوكلاند'] },
    { name: 'جورجيا الجنوبية', flag: './flag-cards/gs.png', alternatives: ['south georgia', 'جورجيا الجنوبية'] },
    { name: 'الإقليم البريطاني بالمحيط الهندي', flag: './flag-cards/io.png', alternatives: ['british indian ocean territory', 'بيوت'] },
    { name: 'جزر العذراء البريطانية', flag: './flag-cards/vg.png', alternatives: ['british virgin islands', 'فيرجن البريطانية'] },
    { name: 'بورتوريكو', flag: './flag-cards/pr.png', alternatives: ['puerto rico', 'بورتو ريكو'] },
    { name: 'جزر العذراء الأمريكية', flag: './flag-cards/vi.png', alternatives: ['us virgin islands', 'فيرجن الامريكية'] },
    { name: 'انتاركتيكا', flag: './flag-cards/aq.png', alternatives: ['antarctica', 'القطب الجنوبي'] },
    { name: 'جزيرة بوفيه', flag: './flag-cards/bv.png', alternatives: ['bouvet island', 'بوفيه'] },
    { name: 'جزر هيرد وماكدونالد', flag: './flag-cards/hm.png', alternatives: ['heard island', 'ماكدونالد'] },
    { name: 'مملكة اسواتيني', flag: './flag-cards/sz.png', alternatives: ['eswatini', 'سوازيلاند'] },
    { name: 'الراس الاخضر', flag: './flag-cards/cv.png', alternatives: ['cape verde', 'كاب فيردي'] },
    { name: 'ساو تومي وبرينسيب', flag: './flag-cards/st.png', alternatives: ['sao tome', 'ساو تومي'] },
    { name: 'غينيا بيساو', flag: './flag-cards/gw.png', alternatives: ['guinea bissau', 'غينيا بيساو'] },
    { name: 'فانواتو', flag: './flag-cards/vu.png', alternatives: ['vanuatu', 'فانواتو'] },
    { name: 'جزر سليمان', flag: './flag-cards/sb.png', alternatives: ['solomon islands', 'سليمان'] },
    { name: 'بابوا غينيا الجديدة', flag: './flag-cards/pg.png', alternatives: ['papua new guinea', 'بابوا'] }
];

// ==================== تخزين الألعاب ====================
const activeGames = new Map(); // اللعبة الفردية
const eventGames = new Map(); // الإيفنتات

client.once('ready', () => {
    console.log(`✅ البوت شغال! تم تسجيل الدخول كـ ${client.user.tag}`);
    console.log(`🎮 عدد الأعلام المتاحة: ${countries.length} علم`);
});

// ==================== دالة بدء جولة إيفنت ====================
function startEventRound(channel, eventData) {
    if (eventData.currentRound >= eventData.totalRounds) {
        // انتهى الإيفنت - عرض Leaderboard
        const sortedScores = eventData.scores.sort((a, b) => b.points - a.points);
        
        let leaderboardText = '';
        if (sortedScores.length === 0) {
            leaderboardText = 'لا يوجد نقاط';
        } else {
            const medals = ['🥇', '🥈', '🥉'];
            leaderboardText = sortedScores.slice(0, 10).map((score, index) => {
                const medal = index < 3 ? medals[index] : `**${index + 1}.**`;
                return `${medal} <@${score.userId}>: **${score.points}** نقطة`;
            }).join('\n');
        }
        
        const endEmbed = new EmbedBuilder()
            .setTitle('انتهى لبى العين')
            .setDescription('**🎮 النتايج النهائية:**\n\n' + leaderboardText)
            .setColor('#FFD700')
            .setFooter({ text: `إجمالي الجولات: ${eventData.totalRounds}` })
            .setTimestamp();
        
        channel.send({ embeds: [endEmbed] });
        eventGames.delete(channel.id);
        activeGames.delete(channel.id);
        return;
    }

    // بدء جولة جديدة
    eventData.currentRound++;
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    
    activeGames.set(channel.id, {
        country: randomCountry,
        startTime: Date.now(),
        isEvent: true
    });

    channel.send({
        content: `**🎮 الجولة ${eventData.currentRound}/${eventData.totalRounds}**`,
        files: [randomCountry.flag]
    });

    // مؤقت 15 ثانية
    const timeout = setTimeout(() => {
        if (activeGames.has(channel.id) && activeGames.get(channel.id).country === randomCountry) {
            channel.send(`⏰ **خلص الوقت!**\n✅ الإجابة الصحيحة: **${randomCountry.name}**`);
            activeGames.delete(channel.id);
            
            // بدء الجولة التالية بعد 3 ثواني
            setTimeout(() => {
                if (eventGames.has(channel.id)) {
                    startEventRound(channel, eventGames.get(channel.id));
                }
            }, 3000);
        }
    }, 15000);

    activeGames.get(channel.id).timeout = timeout;
}

// ==================== الأوامر ====================
client.on('messageCreate', message => {
    if (message.author.bot) return;

    // ==================== أمر إيفنت الأعلام ====================
    if (message.content === '-ايفنت اعلام' || message.content === '!event flags') {
        if (eventGames.has(message.channel.id)) {
            message.reply('⚠️ فيه ايفنت شغال');
            return;
        }

        const setupEmbed = new EmbedBuilder()
            .setTitle('🎮 إيفنت الأعلام')
            .setDescription('**كم عدد الجولات؟**\nاكتب رقم من **1** إلى **50**')
            .setColor('#00D9FF')
            .setFooter({ text: 'عندك 30 ثانيه ترد فيها' })
            .setTimestamp();

        message.reply({ embeds: [setupEmbed] });
        
        const filter = m => m.author.id === message.author.id && !isNaN(m.content);
        const collector = message.channel.createMessageCollector({ filter, time: 30000, max: 1 });
        
        collector.on('collect', m => {
            const rounds = parseInt(m.content);
            
            if (rounds < 1 || rounds > 50) {
                message.channel.send('ماتشوف انت مكتوب من 1 الى 50 طالع عدل');
                return;
            }
            
            const eventData = {
                totalRounds: rounds,
                currentRound: 0,
                scores: [],
                startedBy: message.author.id
            };
            
            eventGames.set(message.channel.id, eventData);
            
            const startEmbed = new EmbedBuilder()
                .setTitle('🎮 بدء الايفنت!')
                .setDescription(`**📊 عدد الجولات:** ${rounds}\n**👤 اللي بدا الايفنت:** ${message.author}\n\n⏰ بيبدأ الايفنت خلال **3 ثواني**...`)
                .setColor('#00FF00')
                .setTimestamp();
            
            message.channel.send({ embeds: [startEmbed] });
            
            setTimeout(() => {
                startEventRound(message.channel, eventData);
            }, 3000);
        });
        
        collector.on('end', collected => {
            if (collected.size === 0) {
                message.channel.send('انتهى الوقت ما اخترت عدد الجولات');
            }
        });
        
        return;
    }

    // ==================== أمر إلغاء الإيفنت ====================
    if (message.content === '-الغاء ايفنت' || message.content === '!cancel event') {
        if (!eventGames.has(message.channel.id)) {
            message.reply('مافيه ايفنت شغال اصلا');
            return;
        }
        
        const eventData = eventGames.get(message.channel.id);
        if (message.author.id !== eventData.startedBy && !message.member.permissions.has('ManageMessages')) {
            message.reply('بس اللي بدا الايفنت او اللي معه رول يقدر يطفيه');
            return;
        }
        
        eventGames.delete(message.channel.id);
        const game = activeGames.get(message.channel.id);
        if (game && game.timeout) {
            clearTimeout(game.timeout);
        }
        activeGames.delete(message.channel.id);
        
        message.reply('✅ تم إلغاء الإيفنت!');
        return;
    }

    // ==================== أمر لعبة فردية ====================
    if (message.content === '-اعلام' || message.content === '!flag') {
        if (eventGames.has(message.channel.id)) {
            message.reply('⚠️ فيه ايفنت يشتغل الحين استخدم `-الغاء ايفنت` عشان تطفيه.');
            return;
        }
        
        if (activeGames.has(message.channel.id)) {
            message.reply('فيه لعبة تشتغل الحين جاوب على السؤال الحالي أول');
            return;
        }

        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        
        activeGames.set(message.channel.id, {
            country: randomCountry,
            startTime: Date.now(),
            isEvent: false
        });

        message.channel.send({
            files: [randomCountry.flag]
        });

        const timeout = setTimeout(() => {
            if (activeGames.has(message.channel.id)) {
                const game = activeGames.get(message.channel.id);
                message.channel.send({
                    content: `⏰ **انتهى الوقت!**\n❌ محد جاوب\n✅ الاجابة الصحيحة: **${game.country.name}**`
                });
                activeGames.delete(message.channel.id);
            }
        }, 15000);

        activeGames.get(message.channel.id).timeout = timeout;
        return;
    }

    // ==================== التحقق من الإجابة ====================
    if (activeGames.has(message.channel.id)) {
        const game = activeGames.get(message.channel.id);
        const userAnswer = message.content.toLowerCase().trim();
        const correctAnswers = [
            game.country.name.toLowerCase(),
            ...game.country.alternatives.map(alt => alt.toLowerCase())
        ];

        if (correctAnswers.includes(userAnswer)) {
            const timeTaken = ((Date.now() - game.startTime) / 1000).toFixed(1);
            
            if (game.timeout) {
                clearTimeout(game.timeout);
            }

            if (game.isEvent && eventGames.has(message.channel.id)) {
                const eventData = eventGames.get(message.channel.id);
                const userScore = eventData.scores.find(s => s.userId === message.author.id);
                
                if (userScore) {
                    userScore.points++;
                } else {
                    eventData.scores.push({ userId: message.author.id, points: 1 });
                }
                
                eventData.scores.sort((a, b) => b.points - a.points);
                
                message.reply(`😽 صح عليك **${message.author}** شطوووور\n`);
                
                activeGames.delete(message.channel.id);
                
                setTimeout(() => {
                    if (eventGames.has(message.channel.id)) {
                        startEventRound(message.channel, eventData);
                    }
                }, 3000);
            } else {
                message.reply(`😽 صح عليك **${message.author}** شطوووور`);
                activeGames.delete(message.channel.id);
            }
        }
    }

    // ==================== أمر المساعدة ====================
    if (message.content === '!help' || message.content === '!مساعدة') {
        const helpEmbed = new EmbedBuilder()
            .setTitle('📖 قائمة الأوامر')
            .setDescription('**أوامر بوت الأعلام:**')
            .addFields(
                { name: '-اعلام أو !flag', value: 'تشغيل اللعبة', inline: false },
                { name: '-ايفنت اعلام أو !event flags', value: 'بدء إيفنت متعدد الجولات', inline: false },
                { name: '-الغاء ايفنت أو !cancel event', value: 'إلغاء الإيفنت', inline: false },
                { name: '!مساعدة أو !help', value: 'عرض هذه القائمة', inline: false }
            )
            .setColor('#3498db')
            .setFooter({ text: `استمتع باللعب! 🎮 | ${countries.length} علم متاح` });

        message.reply({ embeds: [helpEmbed] });
    }
});

// تسجيل الدخول
(async () => {
    try {
        await extractFlags();
        client.login(process.env.TOKEN);
    } catch (error) {
        console.error('فشل فك الضغط:', error);
        process.exit(1);
    }
})();






