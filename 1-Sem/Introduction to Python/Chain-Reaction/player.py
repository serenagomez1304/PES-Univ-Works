
class Player():
    def __init__(self, board, color, score):
        self.score = score
        self.color = color
        self.board = board

    def computeScore(self):
        self.score = 0
        for i in range(self.board.cols()):
            for j in range(self.board.rows()):
                if self.board.getCellColor(i,j) == self.color:
                    self.score += self.board.getAtomCount(i, j)

    def getColor(self):
        return self.color

    def getScore(self):
        return self.score
