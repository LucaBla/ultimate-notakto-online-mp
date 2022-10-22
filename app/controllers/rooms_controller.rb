class RoomsController < ApplicationController
  def show
    @room = Room.find_by!(code:params[:id])
  end

  def new
    @room = Room.new
  end

  def create
    @room = Room.new
    @room.player1 = current_user.id
    @room.active_player = @room.player1
    @room.build_sub_boards

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
    room = Room.find_by!(code: params[:id])

    played_piece_position = nil
    played_piece_position = SubBoard.find(state_params[:sub_board_id]).move!(state_params[:row], state_params[:col], current_user) if state_params.has_key?(:col)

    room.swap_active_player if played_piece_position != nil

    room.update(room_params)

    if room.adjusted == false && !room_params[:player2].present?
      room.set_starting_player
      room.adjusted = true
      room.save!
    end

    next_player_num = room.get_next_player_num

    html = render(partial: 'boards/board',
                  locals: { room: room, played_piece_position: played_piece_position }, status: 204)

    if(room_params[:player2].present?)
      ActionCable.server.broadcast "room_channel_#{room.id}", {object: 'player_created'}
    else
      ActionCable.server.broadcast "room_channel_#{room.id}", { html: html, object: 'modal',
                                                                next_player_num: next_player_num }
    end
  end

  def reset
    room = Room.find_by!(code: params[:id])
    room.reset_room
    room.set_starting_player
    room.save!

    html = render(partial: 'boards/board',
                  locals: { room: room, starting_player: room.active_player }, status: 204)

    starting_player = room.get_next_player_num

    ActionCable.server.broadcast "room_channel_#{room.id}", { html: html, object: 'reset', starting_player: starting_player }
  end

  private

  def room_params
    params.require(:room).permit(:starting_player, :player2)
  end

  def state_params
    params.require(:room).permit(:row, :col, :sub_board_id)
  end
end
