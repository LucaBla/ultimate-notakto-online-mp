class PiecesController < ApplicationController
  def new
    @piece = Piece.new
  end
  

  def create
    @piece = Piece.new

    @piece.cell = Cell.find(piece_params[:cell])

    if @piece.save
      @room = @piece.cell.row.sub_board.b_row.board.room
      @piece = Piece.new
#      respond_to do |format|
#        format.turbo_stream {render turbo_stream: turbo_stream.append(@room.board, partial: 'pieces/piece')}
#        format.html{
#          redirect_to @room
#        }
#      end
    else
      render 'static_pages/home', status: :unprocessable_entity
    end
  end

  private

  def piece_params
    params.require(:piece).permit(:cell)
  end
end
