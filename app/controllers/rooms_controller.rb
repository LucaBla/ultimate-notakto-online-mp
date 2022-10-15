class RoomsController < ApplicationController
  def show
    @room = Room.find(params[:id])
    RoomChannel.broadcast_to(@room, 'test')

    @piece = Piece.new
  end

  def new
    @room = Room.new
  end

  def create
    @room = Room.new
    @room.board = @room.build_board

    @room.board.b_rows.build([{}, {}, {}])

    @room.board.b_rows.each do |b_row|
      b_row.sub_boards.build([{}, {}, {}])
      b_row.sub_boards.each do |sub_board|
        sub_board.rows.build([{}, {}, {}])
        sub_board.rows.each do |row|
          row.cells.build([{}, {}, {}])
        end
      end
    end

    if @room.save
      redirect_to @room
    else
      render :new, status: :unprocessable_entity
    end
  end
end

# https://www.youtube.com/watch?v=s3CmHhDjuWc&t=4971s
