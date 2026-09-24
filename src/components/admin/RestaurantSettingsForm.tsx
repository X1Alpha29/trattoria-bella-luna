"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { updateRestaurantSettings } from "@/lib/actions/admin-settings";

type Props = {
  restaurantName: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  instagramUrl: string;
  facebookUrl: string;
};

export default function RestaurantSettingsForm({
  restaurantName: initialRestaurantName,
  tagline: initialTagline,
  description: initialDescription,
  address: initialAddress,
  phone: initialPhone,
  email: initialEmail,
  instagramUrl: initialInstagramUrl,
  facebookUrl: initialFacebookUrl,
}: Props) {
  const router = useRouter();

  const [restaurantName, setRestaurantName] = useState(initialRestaurantName);
  const [tagline, setTagline] = useState(initialTagline);
  const [description, setDescription] = useState(initialDescription);
  const [address, setAddress] = useState(initialAddress);
  const [phone, setPhone] = useState(initialPhone);
  const [email, setEmail] = useState(initialEmail);
  const [instagramUrl, setInstagramUrl] = useState(initialInstagramUrl);
  const [facebookUrl, setFacebookUrl] = useState(initialFacebookUrl);

  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSaved(false);

    const formData = new FormData();
    formData.set("restaurantName", restaurantName);
    formData.set("tagline", tagline);
    formData.set("description", description);
    formData.set("address", address);
    formData.set("phone", phone);
    formData.set("email", email);
    formData.set("instagramUrl", instagramUrl);
    formData.set("facebookUrl", facebookUrl);

    startTransition(async () => {
      try {
        await updateRestaurantSettings(formData);
        setSaved(true);
        router.refresh();
      } catch {
        setError("We could not save the restaurant settings.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-bella-line p-6">
      {error && (
        <div
          className="mb-6 border border-bella-terracotta/30 bg-bella-terracotta/10 p-4 font-body text-sm text-bella-terracotta"
          role="alert"
        >
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="restaurant-name"
            className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
          >
            Restaurant name
          </label>

          <input
            id="restaurant-name"
            value={restaurantName}
            onChange={(event) => setRestaurantName(event.target.value)}
            disabled={isPending}
            className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-2.5 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
          />
        </div>

        <div>
          <label
            htmlFor="restaurant-tagline"
            className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
          >
            Tagline
          </label>

          <input
            id="restaurant-tagline"
            value={tagline}
            onChange={(event) => setTagline(event.target.value)}
            disabled={isPending}
            className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-2.5 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="restaurant-description"
            className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
          >
            Description
          </label>

          <textarea
            id="restaurant-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            disabled={isPending}
            rows={2}
            className="mt-2 w-full resize-none border border-bella-line bg-bella-cream px-3 py-2.5 font-body text-sm leading-6 text-bella-charcoal outline-none focus:border-bella-olive"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="restaurant-address"
            className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
          >
            Address
          </label>

          <input
            id="restaurant-address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            disabled={isPending}
            className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-2.5 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
          />
        </div>

        <div>
          <label
            htmlFor="restaurant-phone"
            className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
          >
            Phone
          </label>

          <input
            id="restaurant-phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            disabled={isPending}
            className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-2.5 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
          />
        </div>

        <div>
          <label
            htmlFor="restaurant-email"
            className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
          >
            Email
          </label>

          <input
            id="restaurant-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isPending}
            className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-2.5 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
          />
        </div>

        <div>
          <label
            htmlFor="restaurant-instagram"
            className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
          >
            Instagram URL
          </label>

          <input
            id="restaurant-instagram"
            type="url"
            value={instagramUrl}
            onChange={(event) => setInstagramUrl(event.target.value)}
            disabled={isPending}
            placeholder="https://instagram.com/..."
            className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-2.5 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
          />
        </div>

        <div>
          <label
            htmlFor="restaurant-facebook"
            className="block font-body text-xs uppercase tracking-[0.15em] text-bella-muted"
          >
            Facebook URL
          </label>

          <input
            id="restaurant-facebook"
            type="url"
            value={facebookUrl}
            onChange={(event) => setFacebookUrl(event.target.value)}
            disabled={isPending}
            placeholder="https://facebook.com/..."
            className="mt-2 w-full border border-bella-line bg-bella-cream px-3 py-2.5 font-body text-sm text-bella-charcoal outline-none focus:border-bella-olive"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isPending}
            className="bg-bella-charcoal px-6 py-3 font-body text-xs uppercase tracking-[0.15em] text-bella-cream transition hover:bg-bella-olive disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Saving..." : saved ? "Saved" : "Save changes"}
          </button>
        </div>
      </div>
    </form>
  );
}