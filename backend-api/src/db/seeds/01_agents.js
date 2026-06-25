/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('agents').del();
  await knex('agents').insert([
    {
      id: 'agent-001',
      name: 'Terrell Norman',
      title: 'Senior Property Consultant',
      phone: '(358) 707-4989',
      email: 'terrell.norman@realestate.com',
      image_url: 'https://picsum.photos/seed/agent-001/208/208',
      bio: 'Senior consultant with 10+ years experience in residential and commercial properties.',
    },
    {
      id: 'agent-002',
      name: 'Emilia Buck',
      title: 'Property Investment Advisor',
      phone: '(437) 402-2459',
      email: 'emilia.buck@realestate.com',
      image_url: 'https://picsum.photos/seed/agent-002/208/208',
      bio: 'Specializes in investment properties and luxury real estate across major cities.',
    },
    {
      id: 'agent-003',
      name: 'Marcus Reed',
      title: 'Luxury Real Estate Specialist',
      phone: '(822) 622-2842',
      email: 'marcus.reed@realestate.com',
      image_url: 'https://picsum.photos/seed/agent-003/208/208',
      bio: 'Expert in high-end villas and resort properties. Over 200 successful transactions.',
    },
    {
      id: 'agent-004',
      name: 'Sophie Tran',
      title: 'Residential Sales Manager',
      phone: '(312) 555-0174',
      email: 'sophie.tran@realestate.com',
      image_url: 'https://picsum.photos/seed/agent-004/208/208',
      bio: 'Manages residential sales with a focus on first-time buyers and apartment listings.',
    },
  ]);
};
