/**
 * Shared facts for the contact / careers / privacy pages.
 * Facts come only from the research inventory (design.md §10).
 */

export const DPO = {
  name: 'Despina Glyki',
  email: 'compliance@sc-advisors.cy',
  emailHref: 'mailto:compliance@sc-advisors.cy',
  phone: '+357 25 005284',
  phoneHref: 'tel:+35725005284',
  address:
    'Kanika Business Center, 28th October Avenue 317A Block B, 1st Floor, Office 101, 3105 Limassol, Cyprus',
};

/** Google Maps query for the office (Kanika Business Center, Limassol) */
export const MAP_QUERY = 'Kanika Business Center, 28 Oktovriou 317A, Limassol 3105, Cyprus';

export const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  MAP_QUERY,
)}&output=embed`;

export const MAP_DIRECTIONS_HREF = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  MAP_QUERY,
)}`;
