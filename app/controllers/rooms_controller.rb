class RoomsController < ApplicationController
  def show
    @room = Room.find(params[:id])
  end

  def new
    @room = Room.new
  end

  def create
    @room = Room.new

    if @room.save
      redirect_to @room
    else
      render :new, status: :unprocessable_entity
    end
  end
end
