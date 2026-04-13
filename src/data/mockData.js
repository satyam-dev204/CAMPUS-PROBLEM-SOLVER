// Mock complaints data used across all pages
export const initialComplaints = [
  {
    id: 'CPS-1001',
    name: 'Arjun Mehta',
    reg: '22BCS012',
    block: 'Block C',
    room: '204',
    desc: 'Washroom on 2nd floor has been out of order for 3 days. Strong odor is spreading to nearby classrooms.',
    category: 'Hygiene',
    status: 'Resolved',
    updated: '2 hours ago',
    resolution: 'Plumber dispatched and issue fixed.',
  },
  {
    id: 'CPS-1002',
    name: 'Priya Nair',
    reg: '21BCE034',
    block: 'Block A',
    room: '101',
    desc: 'Broken bench outside the library near Gate 4. Students are at risk of injury from the sharp wood.',
    category: 'Safety',
    status: 'In Progress',
    updated: '5 hours ago',
    resolution: '',
  },
  {
    id: 'CPS-1003',
    name: 'Rohit Das',
    reg: '22BCS101',
    block: 'Block D',
    room: 'Lab-3',
    desc: 'WiFi in the Computer Science lab (Room 301) is extremely slow. Cannot access online resources during classes.',
    category: 'IT',
    status: 'Submitted',
    updated: '1 day ago',
    resolution: '',
  },
  {
    id: 'CPS-1004',
    name: 'Sneha Rao',
    reg: '21BME056',
    block: 'H1 Hostel',
    room: 'H1-312',
    desc: 'Street lights near the hostel parking area are not working since last week. Safety concern for students returning late.',
    category: 'Infrastructure',
    status: 'In Progress',
    updated: '2 days ago',
    resolution: '',
  },
  {
    id: 'CPS-1005',
    name: 'Karan Singh',
    reg: '23BCS009',
    block: 'Block B',
    room: 'Floor 3',
    desc: 'Water cooler on Floor 3, Academic Block is leaking and creating a slip hazard in the corridor.',
    category: 'Safety',
    status: 'Submitted',
    updated: '3 days ago',
    resolution: '',
  },
];

export const blockOptions = [
  'Block A', 'Block B', 'Block C', 'Block D', 'Block E',
  'H1 Hostel', 'H2 Hostel', 'Girls Hostel', 'Admin Block', 'Library',
];

export const categoryOptions = [
  'Infrastructure', 'Hygiene', 'Safety', 'IT', 'Academic', 'Other',
];