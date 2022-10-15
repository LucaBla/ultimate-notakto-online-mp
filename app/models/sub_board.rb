class SubBoard < ApplicationRecord
  belongs_to :b_row
  has_many :rows
end
