import "dotenv/config";
import { PrismaClient, Prisma } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Seeding Trattoria Bella Luna...");

  // Clear existing development data.
  await prisma.review.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.galleryImage.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.menuCategory.deleteMany();
  await prisma.openingHour.deleteMany();
  await prisma.restaurantSettings.deleteMany();

  // --------------------------------------------------
  // MENU CATEGORIES
  // --------------------------------------------------

  const antipasti = await prisma.menuCategory.create({
    data: {
      name: "Antipasti",
      slug: "antipasti",
      displayOrder: 1,
    },
  });

  const pasta = await prisma.menuCategory.create({
    data: {
      name: "Pasta",
      slug: "pasta",
      displayOrder: 2,
    },
  });

  const secondi = await prisma.menuCategory.create({
    data: {
      name: "Secondi",
      slug: "secondi",
      displayOrder: 3,
    },
  });

  const dolci = await prisma.menuCategory.create({
    data: {
      name: "Dolci",
      slug: "dolci",
      displayOrder: 4,
    },
  });

  await prisma.menuCategory.create({
    data: {
      name: "Drinks",
      slug: "drinks",
      displayOrder: 5,
    },
  });

  // --------------------------------------------------
  // MENU ITEMS
  // --------------------------------------------------

  await prisma.menuItem.createMany({
    data: [
      {
        categoryId: antipasti.id,
        name: "Burrata Pugliese",
        slug: "burrata-pugliese",
        description:
          "Creamy burrata, roasted tomatoes, basil oil and toasted sourdough.",
        price: new Prisma.Decimal("12.00"),
        imageUrl:
          "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=1200&q=85",
        dietaryTags: ["VEGETARIAN"],
        displayOrder: 1,
        isFeatured: true,
        featuredOrder: 1,
      },
      {
        categoryId: antipasti.id,
        name: "Polpo alla Griglia",
        slug: "polpo-alla-griglia",
        description:
          "Charred octopus, lemon, chickpeas, parsley and smoked paprika.",
        price: new Prisma.Decimal("15.00"),
        imageUrl:
          "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=85",
        dietaryTags: [],
        displayOrder: 2,
      },
      {
        categoryId: pasta.id,
        name: "Tagliatelle al Ragù",
        slug: "tagliatelle-al-ragu",
        description:
          "Hand-cut pasta with slow-cooked beef ragù, parmesan and fresh herbs.",
        price: new Prisma.Decimal("18.00"),
        imageUrl:
          "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85",
        dietaryTags: [],
        displayOrder: 1,
        isFeatured: true,
        featuredOrder: 2,
      },
      {
        categoryId: pasta.id,
        name: "Cacio e Pepe",
        slug: "cacio-e-pepe",
        description:
          "Tonnarelli, pecorino romano and freshly cracked black pepper.",
        price: new Prisma.Decimal("16.00"),
        dietaryTags: ["VEGETARIAN"],
        displayOrder: 2,
      },
      {
        categoryId: pasta.id,
        name: "Ravioli di Ricotta",
        slug: "ravioli-di-ricotta",
        description:
          "Handmade ricotta ravioli, sage butter and aged parmesan.",
        price: new Prisma.Decimal("19.00"),
        dietaryTags: ["VEGETARIAN"],
        displayOrder: 3,
      },
      {
        categoryId: secondi.id,
        name: "Branzino",
        slug: "branzino",
        description:
          "Roasted sea bass, lemon, fennel, capers and extra virgin olive oil.",
        price: new Prisma.Decimal("24.00"),
        imageUrl:
          "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85",
        dietaryTags: [],
        displayOrder: 1,
        isFeatured: true,
        featuredOrder: 3,
      },
      {
        categoryId: secondi.id,
        name: "Pollo alla Milanese",
        slug: "pollo-alla-milanese",
        description:
          "Crispy breaded chicken, rocket, lemon and parmesan.",
        price: new Prisma.Decimal("21.00"),
        dietaryTags: [],
        displayOrder: 2,
      },
      {
        categoryId: dolci.id,
        name: "Tiramisù",
        slug: "tiramisu",
        description:
          "Espresso-soaked savoiardi, mascarpone cream and cocoa.",
        price: new Prisma.Decimal("9.00"),
        dietaryTags: ["VEGETARIAN"],
        displayOrder: 1,
      },
      {
        categoryId: dolci.id,
        name: "Panna Cotta",
        slug: "panna-cotta",
        description:
          "Vanilla panna cotta with seasonal berries and basil syrup.",
        price: new Prisma.Decimal("9.00"),
        dietaryTags: ["VEGETARIAN"],
        displayOrder: 2,
      },
    ],
  });

  // --------------------------------------------------
  // GALLERY
  // --------------------------------------------------

  await prisma.galleryImage.createMany({
    data: [
      {
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85",
        title: "The dining room",
        caption: "An intimate setting for long Italian evenings.",
        category: "INTERIOR",
        displayOrder: 1,
        isFeatured: true,
      },
      {
        url: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1400&q=85",
        title: "Tagliatelle al Ragù",
        caption: "Handmade pasta from our kitchen.",
        category: "FOOD",
        displayOrder: 2,
        isFeatured: true,
      },
      {
        url: "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=1400&q=85",
        title: "Burrata Pugliese",
        caption: "Seasonal ingredients, simply prepared.",
        category: "FOOD",
        displayOrder: 3,
        isFeatured: true,
      },
    ],
  });

  // --------------------------------------------------
  // REVIEWS
  // --------------------------------------------------

  await prisma.review.createMany({
    data: [
      {
        customerName: "Emma Wilson",
        rating: 5,
        comment:
          "Beautiful food, thoughtful service and a wonderful atmosphere.",
        status: "APPROVED",
        isFeatured: true,
      },
      {
        customerName: "Daniel Martin",
        rating: 5,
        comment:
          "The pasta was exceptional and the whole evening felt special.",
        status: "APPROVED",
        isFeatured: true,
      },
      {
        customerName: "Sophie Turner",
        rating: 4,
        comment:
          "A lovely restaurant with excellent food and friendly staff.",
        status: "APPROVED",
        isFeatured: true,
      },
      {
        customerName: "James Harris",
        rating: 5,
        comment:
          "Exactly the kind of Italian restaurant London needs.",
        status: "PENDING",
        isFeatured: false,
      },
    ],
  });

  // --------------------------------------------------
  // RESTAURANT SETTINGS
  // --------------------------------------------------

  await prisma.restaurantSettings.create({
    data: {
      restaurantName: "Trattoria Bella Luna",
      tagline: "Authentic Italian flavours, made for London.",
      description:
        "Seasonal Italian cooking, handmade pasta and memorable evenings in the heart of London.",
      address: "12–14 Kensington Park Road, London",
      phone: "+44 20 7946 0123",
      email: "hello@bellaluna.example",
      instagramUrl: "https://instagram.com",
      facebookUrl: "https://facebook.com",
    },
  });

  // --------------------------------------------------
  // OPENING HOURS
  // --------------------------------------------------

  const openingHours = [
    ["MONDAY", "12:00", "22:30", false],
    ["TUESDAY", "12:00", "22:30", false],
    ["WEDNESDAY", "12:00", "22:30", false],
    ["THURSDAY", "12:00", "22:30", false],
    ["FRIDAY", "12:00", "23:30", false],
    ["SATURDAY", "12:00", "23:30", false],
    ["SUNDAY", null, null, true],
  ] as const;

  await prisma.openingHour.createMany({
    data: openingHours.map(([dayOfWeek, openTime, closeTime, isClosed]) => ({
      dayOfWeek,
      openTime,
      closeTime,
      isClosed,
    })),
  });

  console.log("Seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });