#require 'redis'
class RoomsController < ApplicationController
  def show
    @room = Room.find(params[:id])
    RoomChannel.broadcast_to(@room, 'test')
    if @room.player2 == @room.player1
      @room.player2 = nil 
    end
    if @room.player2 == nil && @room.player1 != current_user.id
      @room.player2 = current_user.id
      @room.save
    end
  end

  def new
    @room = Room.new
  end

  def create
    @room = Room.new
    #@room.board = @room.build_board
    @room.player_count = 0
    @room.starting_player = '1'
    @room.player1 = current_user.id
    @room.active_player = @room.player1
    @room.adjusted = false

    @room.build_sub_boards

    #@board = @room.board

    #@room.board.b_rows.build([{}, {}, {}])

    #@room.board.b_rows.each do |b_row|
    #  b_row.sub_boards.build([{}, {}, {}])
    #  b_row.sub_boards.each do |sub_board|
    #    sub_board.rows.build([{}, {}, {}])
    #    sub_board.rows.each do |row|
    #      row.cells.build([{}, {}, {}])
    #    end
    #  end
    #end

    if @room.save
      @room.state = {
        0 => { 0 => @room.sub_boards[0].id, 1 => @room.sub_boards[1].id, 2 => @room.sub_boards[2].id },
        1 => { 0 => @room.sub_boards[3].id, 1 => @room.sub_boards[4].id, 2 => @room.sub_boards[5].id },
        2 => { 0 => @room.sub_boards[6].id, 1 => @room.sub_boards[7].id, 2 => @room.sub_boards[8].id }
      }

      @room.save

      redirect_to @room
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    room = Room.find(params[:id])
    room.adjusted = true
    #room.move!(state_params[:row], state_params[:col]) if state_params.has_key?(:col)
    SubBoard.find(state_params[:sub_board_id]).move!(state_params[:row], state_params[:col], current_user) if state_params.has_key?(:col)
    room.update(room_params)

    html = render(partial: 'boards/board', locals: { room: room })

    ActionCable.server.broadcast "room_channel_#{room.id}", html: html, object: 'modal', winner: room.get_winner(current_user)
  end

  private

  def room_params
    params.require(:room).permit(:starting_player)
  end

  def state_params
    params.require(:room).permit(:row, :col, :sub_board_id)
  end
end

# https://www.youtube.com/watch?v=s3CmHhDjuWc&t=4971s
