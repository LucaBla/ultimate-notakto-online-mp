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
      html = render(partial: 'boards/board', locals:{ room: @room } )

      ActionCable.server.broadcast "room_channel_#{@room.id}", html: html, object: 'piece',
                                                               player_count: @room.player_count
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
