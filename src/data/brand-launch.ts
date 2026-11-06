export type BrandLaunchCategory = {
  id: string;
  category: string;
  headline: string;
  description: string;
  services: string;
  ctaLabel: string;
  inquiry: string;
  imageAlt: string;
};

export const brandLaunchCategories: readonly BrandLaunchCategory[] = [
  {
    id: "tea",
    category: "Tea",
    headline: "Your tea deserves more than a label.",
    description: "A distinctive identity. A stronger digital presence. Let's build a tea brand people remember.",
    services: "Brand identity / Content / Campaigns",
    ctaLabel: "Launch Your Tea Brand",
    inquiry: "I'm planning to launch a tea brand and would like to discuss brand identity, digital presence, marketing and the scope of packaging design.",
    imageAlt: "An unbranded green tea tin, amber Assam tea and fresh tea leaves in natural light.",
  },
  {
    id: "coffee",
    category: "Coffee",
    headline: "Brew a brand worth remembering.",
    description: "Distinctive identity, digital experiences and creative marketing. Made for your coffee brand.",
    services: "Brand identity / Digital / Creative marketing",
    ctaLabel: "Build Your Coffee Brand",
    inquiry: "I'm planning to launch a coffee brand and would like to discuss brand identity, digital presence, creative marketing and packaging design scope.",
    imageAlt: "Espresso, coffee beans and an unbranded burgundy coffee pouch on a cafe table.",
  },
  {
    id: "beauty-skincare",
    category: "Beauty & Skincare",
    headline: "Beauty begins with a brilliant brand.",
    description: "Thoughtful identity, content and campaigns. Give your beauty brand a presence of its own.",
    services: "Product identity / Content / Campaigns",
    ctaLabel: "Launch Your Beauty Brand",
    inquiry: "I'm planning to launch a beauty or skincare brand and would like to discuss product identity, content, campaigns and packaging design scope.",
    imageAlt: "A frosted skincare bottle and blush cosmetic jar on pink stone with soft daylight.",
  },
  {
    id: "masalas",
    category: "Masalas & Spices",
    headline: "Bold flavours deserve bold branding.",
    description: "Turn unmistakable flavour into a distinctive identity, creative content and memorable campaigns.",
    services: "Brand identity / Creative content / Marketing",
    ctaLabel: "Build Your Masala Brand",
    inquiry: "I'm planning to launch a masala or spice brand and would like to discuss brand identity, creative content, marketing and packaging design scope.",
    imageAlt: "Turmeric, dried red chillies, cumin and an unbranded terracotta spice tin.",
  },
  {
    id: "food-beverage",
    category: "Food & Beverage",
    headline: "Make your next product everyone's favourite.",
    description: "A standout identity, appetising content and campaigns that bring your brand to the table.",
    services: "Brand identity / Content / Campaigns",
    ctaLabel: "Launch Your Food Brand",
    inquiry: "I'm planning to launch a food or beverage brand and would like to discuss brand identity, content, campaigns and the scope of packaging design.",
    imageAlt: "An unbranded citrus drink, fresh orange and lime, and crackers on a pale green table.",
  },
  {
    id: "fashion-lifestyle",
    category: "Fashion & Lifestyle",
    headline: "Don't just launch a label. Create an identity.",
    description: "Creative direction, digital experiences and marketing. For a label with a point of view.",
    services: "Creative direction / Digital / Marketing",
    ctaLabel: "Build Your Fashion Brand",
    inquiry: "I'm planning to launch a fashion or lifestyle brand and would like help with creative direction, digital experiences and marketing.",
    imageAlt: "A black leather bag, ivory shirt and silver sunglasses in a fashion editorial still life.",
  },
  {
    id: "organic-wellness",
    category: "Organic & Wellness",
    headline: "Naturally different. Beautifully branded.",
    description: "Thoughtful identity and honest storytelling. Bring your wellness brand into focus.",
    services: "Brand identity / Storytelling / Digital",
    ctaLabel: "Launch Your Wellness Brand",
    inquiry: "I'm planning to launch an organic or wellness brand and would like to discuss brand identity, storytelling, digital presence and packaging design scope.",
    imageAlt: "An unbranded amber jar, dried botanicals, fresh herbs and natural linen in soft daylight.",
  },
  {
    id: "cafes-hospitality",
    category: "Cafes & Hospitality",
    headline: "Create a place people love coming back to.",
    description: "From first impressions to local campaigns. Give your place an identity worth returning to.",
    services: "Visual identity / Digital / Local campaigns",
    ctaLabel: "Build Your Hospitality Brand",
    inquiry: "I'm planning to launch a cafe or hospitality business and would like help with visual identity, digital presence, content and local campaigns.",
    imageAlt: "An inviting cafe with green seating, a marble table, coffee cups and a croissant.",
  },
];

export function brandLaunchInquiry(interest: string | string[] | undefined) {
  return typeof interest === "string"
    ? brandLaunchCategories.find((category) => category.id === interest)?.inquiry
    : undefined;
}
