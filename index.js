const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
const config = require("./config.json");

// ساخت کلاینت دیسکورد
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.once("ready", () => {
    console.log(`${client.user.tag} is online!`);
    updateStatus(); // استاتوس اولیه برای همه سرورها
});

// وقتی بات به یک سرور جدید اضافه می‌شود
client.on("guildCreate", (guild) => {
    console.log(`Joined a new server: ${guild.name}`);
    updateStatus(); // بروز کردن استاتوس برای سرورهای جدید
});

// وقتی بات از یک سرور حذف می‌شود
client.on("guildDelete", (guild) => {
    console.log(`Left a server: ${guild.name}`);
    updateStatus(); // بروز کردن استاتوس بعد از خروج
});

// تابع برای بروز رسانی استاتوس
function updateStatus() {
    let totalMembers = 0;
    client.guilds.cache.forEach((guild) => {
        totalMembers += guild.memberCount; // محاسبه تعداد کل اعضا
    });

    client.user.setPresence({
        status: "idle", // تنظیم استاتوس روی idle
        activities: [
            {
                name: `${totalMembers} Members !`,
                type: ActivityType.Watching,
            },
        ],
    });

    console.log(`Updated status: Watching ${totalMembers} Members`);
}

// بروز رسانی استاتوس هر 5 دقیقه
setInterval(updateStatus, 300000);

client.login(config.Token);

require("./server"); // Keep Alive Server
