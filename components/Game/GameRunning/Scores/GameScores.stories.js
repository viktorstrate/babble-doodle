import React from 'react'
import { action } from '@storybook/addon-actions'
import GameScores from './GameScores'
import Layout from '../../../Layout'

export default {
  title: 'Scores',
  component: GameScores,
}

const exampleGameState = {
  gameState: {
    players: [
      {
        image: {
          lines: [
            {
              path: [
                [186, 128],
                [186, 126],
                [184, 119],
                [181, 108],
                [178, 97],
                [172, 75],
                [168, 56],
                [161, 27],
                [160, 22],
                [159, 20],
                [159, 20],
                [156, 21],
                [150, 27],
                [141, 34],
                [123, 60],
                [101, 104],
                [80, 144],
                [72, 157],
                [67, 163],
                [66, 164],
              ],
            },
          ],
          width: '200',
          height: '200',
        },
        id: '/aujlbm5oleyw8ssf#eybjf5NwnRaAoGXiAAAl',
      },
      {
        image: {
          lines: [
            {
              path: [],
            },
          ],
          width: '200',
          height: '200',
        },
        id: '/aujlbm5oleyw8ssf#u6MzETIHYY7Q2bTIAAAm',
      },
      {
        image: {
          lines: [
            {
              path: [],
            },
          ],
          width: '200',
          height: '200',
        },
        id: '/aujlbm5oleyw8ssf#cQuOwTDugKyCTDOrAAAn',
      },
    ],
    gameId: 'aujlbm5oleyw8ssf',
    state: 'running',
    round: {
      votes: [
        {
          id: '/aujlbm5oleyw8ssf#eybjf5NwnRaAoGXiAAAl',
          image: {
            lines: [
              {
                path: [
                  [278, 410],
                  [278, 409],
                  [430, 239],
                  [445, 237],
                  [450, 237],
                ],
              },
              {
                path: [
                  [444, 383],
                  [444, 383],
                  [442, 382],
                  [439, 379],
                  [355, 184],
                  [355, 169],
                  [355, 159],
                  [353, 159],
                  [351, 159],
                  [347, 161],
                  [342, 163],
                  [331, 168],
                  [315, 175],
                  [301, 181],
                  [273, 192],
                  [242, 204],
                  [197, 224],
                  [175, 232],
                  [163, 235],
                  [163, 235],
                ],
              },
            ],
            width: '640',
            height: '480',
          },
          votes: 3,
        },
        {
          id: '/aujlbm5oleyw8ssf#u6MzETIHYY7Q2bTIAAAm',
          image: {
            lines: [
              {
                path: [
                  [278, 410],
                  [278, 409],
                  [430, 239],
                  [445, 237],
                  [450, 237],
                ],
              },
              {
                path: [
                  [444, 383],
                  [444, 383],
                  [442, 382],
                  [353, 159],
                  [351, 159],
                  [347, 161],
                  [342, 163],
                  [331, 168],
                  [197, 224],
                  [175, 232],
                  [163, 235],
                  [163, 235],
                ],
              },
            ],
            width: '640',
            height: '480',
          },
          votes: 4,
        },
        {
          id: 'disconnected-user-id',
          image: {
            lines: [
              {
                path: [
                  [278, 410],
                  [278, 409],
                  [430, 239],
                  [445, 237],
                  [450, 237],
                ],
              },
              {
                path: [
                  [444, 383],
                  [444, 383],
                  [442, 382],
                  [353, 159],
                  [351, 159],
                  [347, 161],
                  [342, 163],
                  [331, 168],
                  [197, 224],
                  [175, 232],
                  [163, 235],
                  [163, 235],
                ],
              },
            ],
            width: '640',
            height: '480',
          },
          votes: 4,
        },
      ],
      state: 'scores',
    },
  },
}

const mockedSocket = {
  emit: action('socket emit'),
  id: '/aujlbm5oleyw8ssf#eybjf5NwnRaAoGXiAAAl',
}

export const Example = () => (
  <Layout>
    <GameScores socket={mockedSocket} gameStateObj={exampleGameState} />
  </Layout>
)
