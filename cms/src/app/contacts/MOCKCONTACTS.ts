import {Contact} from './contact.model';

export const MOCKCONTACTS: Contact[] = [
  // individual contacts
  // index 0
  {
    id: '1',
    isAGroup: false,
    name: 'Rex Barzee',
    email: 'barzeer@byui.edu',
    phone: '208-496-3768',
    imageUrl: '../../assets/images/barzeer.jpg',
    group: null
  },
  // index 1
  {
    id: '2',
    isAGroup: false,
    name: 'Bradley Armstrong',
    email: 'armstrongb@byui.edu',
    phone: '208-496-3766',
    imageUrl: '../../assets/images/armstrongb.jpg',
    group: null
  },
  // index 2
  {
    id: '3',
    isAGroup: false,
    name: 'Lee Barney',
    email: 'barneyl@byui.edu',
    phone: '208-496-3767',
    imageUrl: '../../assets/images/barneyl.jpg',
    group: null
  },
  // index 3
  {
    id: '5',
    isAGroup: false,
    name: 'Kory Godfrey',
    email: 'godfreyko@byui.edu',
    phone: '208-496-3770',
    imageUrl: '../../assets/images/godfreyko.jpg',
    group: null
  },
  // index 4
  {
    id: '7',
    isAGroup: false,
    name: 'R. Kent Jackson',
    email: 'jacksonk@byui.edu',
    phone: '208-496-3771',
    imageUrl: '../../assets/images/jacksonk.jpg',
    group: null
  },
  // index 5
  {
    id: '8',
    isAGroup: false,
    name: 'Craig Lindstrom',
    email: 'lindstromc@byui.edu',
    phone: '208-496-3769',
    imageUrl: '../../assets/images/lindstromc.jpg',
    group: null
  },
  // index 6
  {
    id: '9',
    isAGroup: false,
    name: 'Michael McLaughlin',
    email: 'mclaughlinm@byui.edu',
    phone: '208-496-3772',
    imageUrl: '../../assets/images/mclaughlinm.jpg',
    group: null
  },
  // index 7
  {
    id: '11',
    isAGroup: false,
    name: 'Brent Morring',
    email: 'morringb@byui.edu',
    phone: '208-496-3778',
    imageUrl: '../../assets/images/morringb.jpg',
    group: null
  },
  // index 8
  {
    id: '12',
    isAGroup: false,
    name: 'Mark Olaveson',
    email: 'olavesonm@byui.edu',
    phone: '208-496-3773',
    imageUrl: '../../assets/images/olavesonm.jpg',
    group: null
  },
  // index 9
  {
    id: '13',
    isAGroup: false,
    name: 'Steven Rigby',
    email: 'rigbys@byui.edu',
    phone: '208-496-3774',
    imageUrl: '../../assets/images/rigbys.jpg',
    group: null
  },
  // index 10
  {
    id: '15',
    isAGroup: false,
    name: 'Blaine Robertson',
    email: 'robertsonb@byui.edu',
    phone: '208-496-3775',
    imageUrl: '../../assets/images/robertsonb.jpg',
    group: null
  },
  // index 11
  {
    id: '16',
    isAGroup: false,
    name: 'Randy Somsen',
    email: 'somsenr@byui.edu',
    phone: '208-496-3776',
    imageUrl: '../../assets/images/somsenr.jpg',
    group: null
  },
  // index 12
  {
    id: '17',
    isAGroup: false,
    name: 'Shane Thompson',
    email: 'thompsonda@byui.edu',
    phone: '208-496-3776',
    imageUrl: '../../assets/images/thompsonda.jpg',
    group: null
  },

  // teams
  // index 13
  {
    id: '4', isAGroup: true, name: 'Network/OS team', email: ' ', phone: ' ', imageUrl: '../../assets/images/mexiduck.png', group: [
    {
      id: '2',
      isAGroup: false,
      name: 'Bradley Armstrong',
      email: 'armstrongb@byui.edu',
      phone: '208-496-3766',
      imageUrl: '../../assets/images/armstrongb.jpg',
      group: null
    },
    {
      id: '12',
      isAGroup: false,
      name: 'Mark Olaveson',
      email: 'olavesonm@byui.edu',
      phone: '208-496-3773',
      imageUrl: '../../assets/images/olavesonm.jpg',
      group: null
    },
    {
      id: '13',
      isAGroup: false,
      name: 'Steven Rigby',
      email: 'rigbys@byui.edu',
      phone: '208-496-3774',
      imageUrl: '../../assets/images/rigbys.jpg',
      group: null
    }
  ]
  },

  // index 14
  {
    id: '6', isAGroup: true, name: 'Software Development team', email: ' ', phone: ' ', imageUrl: '../../assets/images/mexiduck.png', group: [
    {
      id: '1',
      isAGroup: false,
      name: 'Rex Barzee',
      email: 'barzeer@byui.edu',
      phone: '208-496-3768',
      imageUrl: '../../assets/images/barzeer.jpg',
      group: null
    },
    {
      id: '3',
      isAGroup: false,
      name: 'Lee Barney',
      email: 'barneyl@byui.edu',
      phone: '208-496-3767',
      imageUrl: '../../assets/images/barneyl.jpg',
      group: null
    },
    {
      id: '7',
      isAGroup: false,
      name: 'R. Kent Jackson',
      email: 'jacksonk@byui.edu',
      phone: '208-496-3771',
      imageUrl: '../../assets/images/jacksonk.jpg',
      group: null
    },
    {
      id: '12',
      isAGroup: false,
      name: 'Mark Olaveson',
      email: 'olavesonm@byui.edu',
      phone: '208-496-3773',
      imageUrl: '../../assets/images/olavesonm.jpg',
      group: null
    }
  ]
  },

  // index 15
  {
    id: '10', isAGroup: true, name: 'Web Development team', email: ' ', phone: ' ', imageUrl: '../../assets/images/mexiduck.png', group: [
    {
      id: '15',
      isAGroup: false,
      name: 'Blaine Robertson',
      email: 'robertsonb@byui.edu',
      phone: '208-496-3775',
      imageUrl: '../../assets/images/robertsonb.jpg',
      group: null
    },
    {
      id: '16',
      isAGroup: false,
      name: 'Randy Somsen',
      email: 'somsenr@byui.edu',
      phone: '208-496-3776',
      imageUrl: '../../assets/images/somsenr.jpg',
      group: null
    },
    {
      id: '17',
      isAGroup: false,
      name: 'Shane Thompson',
      email: 'thompsonda@byui.edu',
      phone: '208-496-3776',
      imageUrl: '../../assets/images/thompsonda.jpg',
      group: null
    }
  ]
  },

  // index 16
  {
    id: '14', isAGroup: true, name: 'Database team', email: ' ', phone: ' ', imageUrl: '../../assets/images/mexiduck.png', group: [
    {
      id: '7',
      isAGroup: false,
      name: 'R. Kent Jackson',
      email: 'jacksonk@byui.edu',
      phone: '208-496-3771',
      imageUrl: '../../assets/images/jacksonk.jpg',
      group: null
    },
    {
      id: '9',
      isAGroup: false,
      name: 'Michael McLaughlin',
      email: 'mclaughlinm@byui.edu',
      phone: '208-496-3772',
      imageUrl: '../../assets/images/mclaughlinm.jpg',
      group: null
    },
    {
      id: '11',
      isAGroup: false,
      name: 'Brent Morring',
      email: 'morringb@byui.edu',
      phone: '208-496-3778',
      imageUrl: '../../assets/images/morringb.jpg',
      group: null
    }
  ]
  },

  // index 17
  {
    id: '18', isAGroup: true, name: 'Computer Security team', email: ' ', phone: ' ', imageUrl: '../../assets/images/mexiduck.png', group: [
    {
      id: '5',
      isAGroup: false,
      name: 'Kory Godfrey',
      email: 'godfreyko@byui.edu',
      phone: '208-496-3770',
      imageUrl: '../../assets/images/godfreyko.jpg',
      group: null
    },
    {
      id: '8',
      isAGroup: false,
      name: 'Craig Lindstrom',
      email: 'lindstromc@byui.edu',
      phone: '208-496-3769',
      imageUrl: '../../assets/images/lindstromc.jpg',
      group: null
    },
    {
      id: '13',
      isAGroup: false,
      name: 'Steven Rigby',
      email: 'rigbys@byui.edu',
      phone: '208-496-3774',
      imageUrl: '../../assets/images/rigbys.jpg',
      group: null
    }
  ]
  }
];
