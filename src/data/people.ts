/**
 * Team members and testimonials.
 *
 * Team is intentionally empty because the About page does not publish a team
 * section. Testimonials stay empty until attributed quotes and written
 * permission are supplied. Never add anonymous or invented testimonials.
 * TODO_CONTENT: see CONTENT_REQUIRED.md -> Testimonials.
 */

export type TeamMember = {
  name: string;
  role: string;
  bio?: string;
  photo: { src: string; width: number; height: number };
  linkedin?: string;
  founder?: boolean;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  photo?: string;
  caseStudy?: string;
};

export const team: TeamMember[] = [];

export const testimonials: Testimonial[] = [];
