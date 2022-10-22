class ApplicationController < ActionController::Base

  helper_method :current_user

  def current_user
    return @current_user if @current_user.present?

    if session[:user_id].present?
      @current_user = User.find_by(id: session[:user_id])
    else
      @current_user = User.create
      UserJob.perform_in(60.minutes, @current_user.id)
      session[:user_id] = @current_user.id
    end

    if @current_user.nil?
      @current_user = User.create
      UserJob.perform_in(60.minutes, @current_user.id)
      session[:user_id] = @current_user.id
    end

    @current_user
  end

end
