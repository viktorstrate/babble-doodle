import React from 'react'
import { action } from '@storybook/addon-actions'
import GameVoting from './GameVoting'

export default {
  title: 'Voting',
  component: GameVoting,
}

const exampleGameState = {
  setGameState: () => {
    action('State updated')
  },
  gameState: {
    round: {
      state: 'voting',
      result: {
        players: [
          {
            role: 'participant',
            image: {
              lines: [
                {
                  path: [
                    [356, 364],
                    [356, 361],
                    [356, 359],
                    [356, 358],
                    [355, 358],
                    [355, 357],
                    [325, 284],
                    [314, 275],
                    [304, 267],
                    [298, 261],
                    [298, 256],
                    [299, 253],
                    [341, 182],
                    [352, 182],
                    [364, 181],
                    [389, 177],
                    [404, 177],
                    [411, 177],
                  ],
                },
                {
                  path: [
                    [368, 313],
                    [368, 313],
                    [367, 311],
                    [335, 214],
                    [332, 210],
                    [328, 200],
                    [202, 130],
                    [181, 133],
                    [206, 337],
                    [232, 387],
                    [235, 392],
                    [235, 393],
                  ],
                },
              ],
              width: '640',
              height: '480',
            },
          },
          {
            role: 'conveyor',
          },
          {
            role: 'painter',
            image: {
              lines: [
                {
                  path: [
                    [399, 258],
                    [393, 254],
                    [386, 249],
                    [361, 235],
                    [141, 227],
                    [161, 214],
                    [208, 173],
                    [243, 133],
                    [284, 47],
                    [284, 68],
                    [285, 96],
                    [288, 107],
                    [296, 121],
                  ],
                },
              ],
              width: '640',
              height: '480',
            },
          },
        ],
      },
    },
  },
}

export const Example = () => <GameVoting gameStateObj={exampleGameState} />
