const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// المجلدات
const flagsDir = path.join(__dirname, 'flags');
const cardsDir = path.join(__dirname, 'flag-cards');

// إنشاء مجلد البطاقات
if (!fs.existsSync(cardsDir)) {
    fs.mkdirSync(cardsDir);
    console.log('✅ تم إنشاء مجلد flag-cards\n');
}

// أسماء الدول بالعربي
const countryNames = {
    'sa': 'السعودية', 'ae': 'الإمارات', 'eg': 'مصر', 'kw': 'الكويت',
    'qa': 'قطر', 'bh': 'البحرين', 'om': 'عمان', 'jo': 'الأردن',
    'iq': 'العراق', 'sy': 'سوريا', 'lb': 'لبنان', 'ps': 'فلسطين',
    'ma': 'المغرب', 'dz': 'الجزائر', 'tn': 'تونس', 'ly': 'ليبيا',
    'sd': 'السودان', 'ye': 'اليمن', 'tr': 'تركيا', 'us': 'أمريكا',
    'cn': 'الصين', 'jp': 'اليابان', 'kr': 'كوريا الجنوبية', 'in': 'الهند',
    'ru': 'روسيا', 'gb': 'بريطانيا', 'fr': 'فرنسا', 'de': 'ألمانيا',
    'it': 'إيطاليا', 'es': 'إسبانيا', 'br': 'البرازيل', 'mx': 'المكسيك',
    'ca': 'كندا', 'au': 'أستراليا', 'za': 'جنوب أفريقيا', 'ng': 'نيجيريا'
};

// دالة إنشاء بطاقة علم واحد
async function createFlagCard(filename) {
    const code = filename.replace('.png', '');
    const inputPath = path.join(flagsDir, filename);
    const outputPath = path.join(cardsDir, filename);

    // تحقق إذا البطاقة موجودة مسبقاً
    if (fs.existsSync(outputPath)) {
        return { filename, status: 'exists' };
    }

    // تحقق إذا الملف موجود
    if (!fs.existsSync(inputPath)) {
        return { filename, status: 'failed', error: 'الملف غير موجود' };
    }

    try {
        // الحصول على اسم الدولة
        const countryName = countryNames[code] || code.toUpperCase();

        // إعدادات البطاقة - Full HD مع خلفية شفافة
        const cardWidth = 1920;
        const cardHeight = 1080;
        const flagWidth = 800;
        const flagHeight = 500;
        const textSize = 80;
        const spacing = 80; // المسافة بين النص والعلم

        // حساب المواضع للتوسيط العمودي الكامل
        const totalHeight = textSize + spacing + flagHeight;
        const startY = (cardHeight - totalHeight) / 2;

        const textY = startY + textSize;           // النص
        const flagY = startY + textSize + spacing; // العلم بعد النص والمسافة

        // قراءة محتوى الملف لمعرفة نوعه
        const fileBuffer = fs.readFileSync(inputPath);
        const isSVG = fileBuffer.toString('utf8', 0, 100).includes('<svg');

        let processedFlag;

        if (isSVG) {
            // معالجة SVG
            processedFlag = await sharp(fileBuffer, { density: 300 })
                .resize(flagWidth, flagHeight, {
                    fit: 'contain',
                    background: { r: 255, g: 255, b: 255, alpha: 0 }
                })
                .png()
                .toBuffer();
        } else {
            // معالجة PNG عادي
            processedFlag = await sharp(fileBuffer)
                .resize(flagWidth, flagHeight, {
                    fit: 'contain',
                    background: { r: 255, g: 255, b: 255, alpha: 0 }
                })
                .toBuffer();
        }

        // إنشاء البطاقة الأساسية (خلفية شفافة)
        const baseCard = await sharp({
            create: {
                width: cardWidth,
                height: cardHeight,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 0 }  // شفافة تماماً
            }
        })
            .png()
            .toBuffer();

        // إنشاء SVG للنص (في المنتصف)
        const svgText = `
        <svg width="${cardWidth}" height="${cardHeight}">
            <defs>
                <style type="text/css">
                    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@700&amp;display=swap');
                </style>
            </defs>
            <text 
                x="${cardWidth / 2}" 
                y="${textY}" 
                font-family="Rubik, Arial, sans-serif" 
                font-size="${textSize}" 
                font-weight="700"
                fill="#ffffff"
                text-anchor="middle">شسم الدولة؟</text>
        </svg>`;

        // دمج كل شيء
        await sharp(baseCard)
            .composite([
                // النص
                {
                    input: Buffer.from(svgText),
                    top: 0,
                    left: 0
                },
                // العلم (في المنتصف)
                {
                    input: processedFlag,
                    top: flagY,
                    left: (cardWidth - flagWidth) / 2
                }
            ])
            .png()
            .toFile(outputPath);

        return { filename, status: 'success', name: countryName };
    } catch (error) {
        return { filename, status: 'failed', error: error.message };
    }
}

// معالجة جميع الأعلام
async function processAllFlags() {
    console.log('🎨 بدء إنشاء بطاقات الأعلام...\n');
    console.log('='.repeat(60) + '\n');

    // قراءة جميع ملفات PNG
    const files = fs.readdirSync(flagsDir).filter(f => f.endsWith('.png'));

    if (files.length === 0) {
        console.log('❌ لم يتم العثور على أي أعلام في مجلد flags!');
        console.log('💡 شغّل سكريبت download-all-flags.js أولاً');
        return;
    }

    console.log(`📊 عدد الأعلام: ${files.length} علم\n`);

    let successCount = 0;
    let existsCount = 0;
    let errorCount = 0;
    const failedFiles = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const progress = Math.floor(((i + 1) / files.length) * 100);

        process.stdout.write(`\r🎴 التقدم: ${progress}% [${i + 1}/${files.length}]    `);

        const result = await createFlagCard(file);

        if (result.status === 'success') {
            successCount++;
            console.log(`\r🎴 التقدم: ${progress}% [${i + 1}/${files.length}] ✅ ${result.name || file}        `);
        } else if (result.status === 'exists') {
            existsCount++;
        } else {
            errorCount++;
            failedFiles.push({ file, error: result.error });
            console.log(`\r🎴 التقدم: ${progress}% [${i + 1}/${files.length}] ❌ ${file}        `);
        }
    }

    // ملخص نهائي
    console.log('\n' + '='.repeat(60));
    console.log('🎉 انتهت المعالجة!\n');
    console.log(`✅ تم إنشاء: ${successCount} بطاقة`);
    console.log(`⏭️  كان موجود مسبقاً: ${existsCount} بطاقة`);
    console.log(`❌ فشلت المعالجة: ${errorCount} بطاقة`);
    console.log(`📁 إجمالي البطاقات: ${successCount + existsCount} بطاقة`);
    console.log(`📂 المجلد: ${cardsDir}`);
    console.log(`📏 المقاس: 1920x1080 بكسل (Full HD)`);
    console.log(`🎭 الخلفية: شفافة (Transparent)`);
    console.log(`📍 التخطيط: نص في الأعلى + علم في الأسفل (متوسطين)`);

    if (failedFiles.length > 0 && failedFiles.length <= 10) {
        console.log(`\n⚠️  الملفات التي فشلت:`);
        failedFiles.forEach(f => console.log(`   - ${f.file}: ${f.error}`));
    } else if (failedFiles.length > 10) {
        console.log(`\n⚠️  ${failedFiles.length} ملف فشل في المعالجة`);
    }

    console.log('\n💡 الآن حدّث كود البوت ليستخدم مجلد flag-cards');
    console.log('='.repeat(60));
}

// تشغيل السكريبت
console.log(`
╔══════════════════════════════════════════════════════════╗
║          🎴 سكريبت إنشاء بطاقات الأعلام 🌍              ║
╚══════════════════════════════════════════════════════════╝
`);

processAllFlags().catch(err => {
    console.error('\n❌ خطأ عام:', err);
    if (err.message.includes('Cannot find module')) {
        console.log('\n💡 نسيت تثبيت Sharp! شغّل: npm install sharp');
    }
    process.exit(1);
});