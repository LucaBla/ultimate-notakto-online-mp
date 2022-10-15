class BoardsController < ApplicationController
  def create
    @board = Board.new

    @board.save
  end
end
