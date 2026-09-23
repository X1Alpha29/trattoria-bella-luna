import { getRestaurantSettings } from "@/lib/restaurant";

import NavbarClient from "@/components/site/NavbarClient";

export default async function Navbar() {
  const settings = await getRestaurantSettings();

  return (
    <NavbarClient
      restaurantName={settings?.restaurantName ?? "Trattoria Bella Luna"}
    />
  );
}