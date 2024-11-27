import { prisma } from "../src/providers/db/prisma.provider";

async function main(){
    await prisma.tb_category.createMany({
        data: [
            { name: "MARKET", description: "Entradas e saídas com mercado." },
            { name: "HEALTH", description: "Entradas e saídas com saúde." },
            { name: "LEISURE", description: "Entradas e saídas com lazer." },
        ],
        skipDuplicates: true
    })
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch((err) => {
        console.log(err);
    })