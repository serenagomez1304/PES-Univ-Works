from math import *
from player import *
#colour of atoms, number of colours. (maximum at the moment is 4 players)
red = (255, 0, 0)
white = (255, 255, 255)
violet = (140, 70, 160)
yellow = (222, 208, 63)
green = (88, 214, 90)
colors = [red, green, violet, yellow]
border = (255, 255, 255)

class Cell():
    def __init__(self):
        self.color = border
        self.neighbors = []
        self.noAtoms = 0
        self.theta = 0

    def addNeighbor(self, nCell):
        self.neighbors.append(nCell)

    def atomCount(self):
        return self.noAtoms

    def setColor(self, color):
        self.color = color

    def getColor(self):
        return self.color

    def addAtom(self, color):
        self.noAtoms += 1
        self.color = color
        if self.noAtoms >= len(self.neighbors):
            self.overFlow(color)

    def tickMinute(self):
        #for speed of rotation of the atom
        self.theta += pi/20
        if self.theta > (2 * pi) :
            self.theta = 0
        return self.theta

    # Split the Atom when it Increases the "LIMIT"
    def overFlow(self, color):
        self.noAtoms = 0
        for m in range(len(self.neighbors)):
            self.neighbors[m].noAtoms += 1
            self.neighbors[m].color = color
            if self.neighbors[m].noAtoms >= len(self.neighbors[m].neighbors):
                self.neighbors[m].overFlow(color)

class Board():
    def __init__(self, noPlayers, width, height, blocks):
        self.noPlayers = noPlayers
        self.width = width
        self.height = height
        self.blocks = blocks
        self.grid = [[]for _ in range(self.cols())]
        self.players = []
        self.currentPlayer = 0
        self.turns = 0

    def initBoard(self):

        for i in range(self.noPlayers):
            player = Player(self, colors[i], 0)
            self.players.append(player)

        for i in range(self.cols()):
            for j in range(self.rows()):
                newObj = Cell()
                self.grid[i].append(newObj)

        for i in range(self.cols()):
            for j in range(self.rows()):
                cell = self.grid[i][j]
                if i > 0:
                    cell.addNeighbor(self.grid[i - 1][j])
                if i < self.rows() - 1:
                    cell.addNeighbor(self.grid[i + 1][j])
                if j < self.cols() - 1:
                    cell.addNeighbor(self.grid[i][j + 1])
                if j > 0:
                    cell.addNeighbor(self.grid[i][j - 1])

    def cell(self, i, j):
        return self.grid[i][j]

    def cols(self):
        return int(self.width/self.blocks)

    def rows(self):
        return int(self.height/self.blocks)

    def getCellColor(self, i, j):
        return self.cell(i,j).getColor()

    def setCellColor(self, i, j, color):
        self.cell(i,j).setColor(color)

    def getAtomCount(self, i, j):
        return self.cell(i,j).atomCount()

    def currentPlayersColor(self):
        return self.players[self.currentPlayer].getColor()

    def addAtom(self, i, j):
        #print(self.currentPlayersColor())
        self.cell(i,j).addAtom(self.currentPlayersColor())

    def isValidMove(self, i, j):
        return ((self.getCellColor(i, j) == self.currentPlayersColor())
                or (self.getCellColor(i, j) == border))

    def nextPlayer(self):
        self.currentPlayer += 1
        if self.currentPlayer >= self.noPlayers:
            self.currentPlayer = 0

    def selectCell(self, i, j):
        if self.isValidMove(i, j):
            self.turns += 1
            self.addAtom(i, j)
            self.nextPlayer()
        if self.turns >= self.noPlayers:
            self.isPlayerInGame()

    # Checking for if any player has lost
    def isPlayerInGame(self):
        for i in range(self.noPlayers):
            self.players[i].computeScore()

    def whoWon(self):
        num = 0 # number of players with 0 score
        for i in range(self.noPlayers):
            if self.players[i].getScore() == 0:
                num += 1
        if num == self.noPlayers - 1:   #if all but one player has zero score
            for i in range(self.noPlayers): #find player with non-zero score
                if self.players[i].getScore():
                    return i # i'th player won
        return 9999 #unknown player
