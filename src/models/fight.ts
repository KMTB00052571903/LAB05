import { Fight } from '../store/types';

export const initialFights: Fight[] = [
  {
    id: 'fight1',
    title: 'Grefg vs Westcol',
    characters: [
      { id: 'char1', name: 'Grefg', image: '/images/grefg.jpg', votes: 0 },
      { id: 'char2', name: 'Westcol', image: '/images/westcol.jpg', votes: 0 }
    ]
  },
  {
    id: 'fight2',
    title: 'Auronplay vs Illojuan',
    characters: [
      { id: 'char3', name: 'Auronplay', image: '/images/auron.jpg', votes: 0 },
      { id: 'char4', name: 'Illojuan', image: '/images/illo.jpg', votes: 0 }
    ]
  },
  {
    id: 'fight3',
    title: 'Ibai vs Rivers',
    characters: [
      { id: 'char5', name: 'Ibai', image: '/images/ibai.jpg', votes: 0 },
      { id: 'char6', name: 'Rivers', image: '/images/rivers.jpg', votes: 0 }
    ]
  },
  {
    id: 'fight4',
    title: 'ElMariana vs Luzu',
    characters: [
      { id: 'char7', name: 'ElMariana', image: '/images/mariana.jpg', votes: 0 },
      { id: 'char8', name: 'Luzu', image: '/images/luzu.jpg', votes: 0 }
    ]
  },
  {
    id: 'fight5',
    title: 'Spreen vs Vegetta',
    characters: [
      { id: 'char9', name: 'Spreen', image: '/images/spreen.jpg', votes: 0 },
      { id: 'char10', name: 'Vegetta', image: '/images/vegetta.jpg', votes: 0 }
    ]
  },
  {
    id: 'fight6',
    title: 'Quackity vs Rubius',
    characters: [
      { id: 'char11', name: 'Quackity', image: '/images/quackity.jpg', votes: 0 },
      { id: 'char12', name: 'Rubius', image: '/images/rubius.jpg', votes: 0 }
    ]
  },
  {
    id: 'fight7',
    title: 'Cristinini vs AriGameplays',
    characters: [
      { id: 'char13', name: 'Cristinini', image: '/images/cristinini.jpg', votes: 0 },
      { id: 'char14', name: 'AriGameplays', image: '/images/ari.jpg', votes: 0 }
    ]
  },
  {
    id: 'fight8',
    title: 'Xokas vs DjMaRiiO',
    characters: [
      { id: 'char15', name: 'Xokas', image: '/images/xokas.jpg', votes: 0 },
      { id: 'char16', name: 'DjMaRiiO', image: '/images/mario.jpg', votes: 0 }
    ]
  }
];