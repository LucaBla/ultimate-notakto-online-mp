class UserJob
  include Sidekiq::Job

  def perform(user_id)
    User.find(user_id).destroy
  end
end
