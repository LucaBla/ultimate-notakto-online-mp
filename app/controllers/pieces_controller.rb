class PiecesController < ApplicationController
  def create
    @piece = Piece.new

    @piece.cell = Cell.find(piece_params[:cell])

    if @piece.save
      redirect_to @piece.cell.row.sub_board.b_row.board.room
    else
      render 'static_pages/home', status: :unprocessable_entity
    end
  end

  private

  def piece_params
    params.require(:piece).permit(:cell)
  end
end
