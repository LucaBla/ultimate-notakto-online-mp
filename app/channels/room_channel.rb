class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_channel_#{params[:room_id]}"
    room = Room.find(params[:room_id])
    room.player_count += 1

    room.save

    html = room.player_count.to_s

    html2 = 'Waiting for players...'

    if room.player_count == 2
      html2 = ApplicationController.render(partial: 'boards/board', locals:{ room: room } )
    end

    ActionCable.server.broadcast "room_channel_#{room.id}", { html: html, html2: html2, object: 'player_count'}
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    room = Room.find(params[:room_id])
    room.player_count -= 1
    room.save

    html = room.player_count.to_s

    html2 = 'Waiting for players...'

    if room.player_count == 0
      room.destroy
    elsif room.player_count == 2
      html2 = ApplicationController.render(partial: 'boards/board', locals:{ room: room } )
    end
    #html3 = ApplicationController.render(partial: 'rooms/wait', locals:{ room: room } )
    html3 =''

    ActionCable.server.broadcast "room_channel_#{room.id}", { html: html, html2: html2, html3: html3, object: 'player_count' }
  end
end