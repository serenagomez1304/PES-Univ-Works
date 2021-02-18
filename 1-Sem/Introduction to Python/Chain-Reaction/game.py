import pygame
import sys
from math import *
from board import *

#background = (12, 56, 66)

background = (20, 20, 20)
width = 400
height = 400
blocks = 40

def init():
    global chainBoard
    chainBoard = Board(noPlayers, width, height, blocks)
    chainBoard.initBoard()

    pygame.init()
    global display
    global clock
    global font
    display = pygame.display.set_mode((width, height))
    clock = pygame.time.Clock()
    font = pygame.font.SysFont("Times New Roman", 30)
    pygame.display.set_caption("Chain Reaction")

def close():
    pygame.quit()
    sys.exit()

def drawBoard():
    x = 0
    y = 0
    #print("currentPlayersColor: ", chainBoard.currentPlayersColor())
    for i in range(int(width/blocks)):
        x += blocks
        y += blocks
        pygame.draw.line(display, chainBoard.currentPlayersColor(), (x, 0), (x, height))
        pygame.draw.line(display, chainBoard.currentPlayersColor(), (0, y),(width, y))

def show1Atom(row, col, x1, y1, w, h):
    pygame.draw.ellipse(display, chainBoard.getCellColor(row,col),
                        (x1, y1, w, h))

def show2Atom(row, col, x1, y1, w, h):
    orientation = chainBoard.cell(row, col).tickMinute()
    pygame.draw.ellipse(display, chainBoard.getCellColor(row,col),
                        (x1, y1, w, h))
    pygame.draw.ellipse(display, chainBoard.getCellColor(row,col),
                        (x1 + (w/2)*cos(orientation),
                         y1  + (h/2)*sin(orientation),
                         w, h))

def show3Atom(row, col, x1, y1, w, h):
    left = blocks/2 - w/2
    top  = blocks/2 - h/2
    orientation = chainBoard.cell(row,col).tickMinute()
    angle = 90
    x = x1 + (w/3)*cos(radians(angle) + orientation) + left
    y = y1 + (h/3)*sin(radians(angle) + orientation) + top
    pygame.draw.ellipse(display, chainBoard.getCellColor(row,col),
                            (x, y, w, h))

    x = x1 + (w/3)*cos(radians(angle + 90) + orientation) + left
    y = y1 + (h/3)*sin(radians(angle + 90) + orientation) + 5
    pygame.draw.ellipse(display, chainBoard.getCellColor(row,col),
                            (x, y, w, h))

    x = x1 + (w/3)*cos(radians(angle - 90) + orientation) + left
    y = y1 + (h/3)*sin(radians(angle - 90) + orientation) + 5
    pygame.draw.ellipse(display, chainBoard.getCellColor(row,col),
                            (x, y, w, h))


def showBoard(vibrate):
    padding = 2
    size = blocks/2 - padding
    left = blocks/2 - size/2
    top  = blocks/2 - size/2

    r = -blocks
    for i in range(chainBoard.cols()):
        r += blocks
        c = -blocks
        for j in range(chainBoard.rows()):
            c += blocks
            if chainBoard.getAtomCount(i,j) == 0:
                chainBoard.setCellColor(i, j, border)
            elif chainBoard.getAtomCount(i,j) == 1:
                show1Atom(i, j, r + left, c + top, size, size)
            elif chainBoard.getAtomCount(i,j) == 2:
                show2Atom(i, j, r + left, c + top, size, size)
            elif chainBoard.cell(i,j).atomCount() == 3:
                show3Atom(i, j, r, c, size, size)

    pygame.display.update()


def handleEvents():
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            close()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_q:
                close()
            if event.key == pygame.K_r:
                init()
        if event.type == pygame.MOUSEBUTTONDOWN:
            x, y = pygame.mouse.get_pos()
            i = int(x/blocks)
            j = int(y/blocks)
            chainBoard.selectCell(i, j)

def gameOver(playerIndex):
        text = font.render("Player %d Won!" % (playerIndex + 1), True, white)
        text2 = font.render("Press \'r\' to Reset!", True, white)

        display.blit(text, (width/3, height/3))
        display.blit(text2, (width/3, height/2 ))
        pygame.display.update()
        clock.tick(60)

def gameLoop(num = 2):
    '''The game is called Chain Reaction, where players play against each other by placing particular coloured atoms in the game grid, and the player who's atoms dominate the grid, wins.
     The rules of the game are simple:
     Each player can click to add their colour of atom in any of the cells of the grid.
     Each cell in the grid can hold (number of neighbouring cells)-1 number of atoms.
     After the cell in the grid reaches its limit, the atoms split and move to the neighbouring cells.
     If there is another colour atom adjacent to the cell, it gets devoured by the colour that split.
     The player without any of his atoms on the grid loses.'''
    global noPlayers
    noPlayers = num
    init()
    vibrate = 0.5
    while(True):
        handleEvents()
        display.fill(background)
        vibrate *= -1
        drawBoard()
        showBoard(vibrate)
        pygame.display.update()

        winner = chainBoard.whoWon()
        #print(winner)
        if winner < 9999:
            gameOver(winner)

        clock.tick(20)

try:
    gameLoop(int(sys.argv[1]))
except:
    gameLoop()
